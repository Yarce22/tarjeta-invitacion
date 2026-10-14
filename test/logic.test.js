import { test } from "node:test";
import assert from "node:assert/strict";
import {
  joinNames,
  countdown,
  resolveGuest,
  buildWhatsAppUrl,
  buildCalendarUrl,
  buildMapUrl,
  guestGreeting,
  buildRequestUrl,
} from "../js/logic.js";

test("guestGreeting uses the explicit greeting when present", () => {
  assert.equal(guestGreeting({ greeting: "Familia Gómez", people: ["A", "B"] }), "Familia Gómez");
});

test("guestGreeting falls back to the people's names", () => {
  assert.equal(guestGreeting({ people: ["Ana Ospina"] }), "Ana Ospina");
  assert.equal(guestGreeting({ people: ["Julián", "Sara"] }), "Julián y Sara");
  assert.equal(guestGreeting({ greeting: "", people: ["Julián", "Sara"] }), "Julián y Sara");
});

test("joinNames handles 0, 1, 2 and 3+ names", () => {
  assert.equal(joinNames([]), "");
  assert.equal(joinNames(["Ana"]), "Ana");
  assert.equal(joinNames(["Ana", "Luis"]), "Ana y Luis");
  assert.equal(joinNames(["Ana", "Luis", "Eva"]), "Ana, Luis y Eva");
});

test("countdown splits the remaining time", () => {
  const now = Date.UTC(2027, 0, 1, 0, 0, 0);
  const target = now + (3 * 864e5 + 5 * 36e5 + 7 * 6e4 + 30000);
  assert.deepEqual(countdown(target, now), { days: 3, hours: 5, minutes: 7, done: false });
});

test("countdown clamps to zero once the date passed", () => {
  assert.deepEqual(countdown(1000, 5000), { days: 0, hours: 0, minutes: 0, done: true });
});

test("countdown returns null when there is no date yet", () => {
  assert.equal(countdown(null, Date.now()), null);
});

test("resolveGuest picks by hash, case-insensitive", () => {
  const guests = { a: { name: "A" }, b: { name: "B" } };
  assert.equal(resolveGuest("#B", guests).name, "B");
});

test("resolveGuest returns null for a missing or unknown code", () => {
  const guests = { a: { name: "A" } };
  assert.equal(resolveGuest("#nope", guests), null);
  assert.equal(resolveGuest("", guests), null);
  assert.equal(resolveGuest("#constructor", guests), null);
});

test("buildRequestUrl opens WhatsApp with the invitation request", () => {
  const url = buildRequestUrl({ number: "573004429998", couple: "Jhonnatan y Juan Jose" });
  assert.ok(url.startsWith("https://wa.me/573004429998?text="));
  assert.match(decodeURIComponent(url.split("text=")[1]), /solicitar mi invitación.*Jhonnatan y Juan Jose/);
});

test("buildWhatsAppUrl targets the number and encodes the message", () => {
  const url = buildWhatsAppUrl({
    number: "573001234567",
    couple: "Jhonnatan y Juan Jose",
    greeting: "Familia Gómez",
    attending: ["Carlos", "Lucía"],
    declining: [],
    note: "",
  });
  assert.ok(url.startsWith("https://wa.me/573001234567?text="));
  const text = decodeURIComponent(url.split("text=")[1]);
  assert.match(text, /Familia Gómez/);
  assert.match(text, /Asistirán: Carlos y Lucía/);
  assert.doesNotMatch(text, /No podrá/);
});

test("buildWhatsAppUrl lists declining guests and the note", () => {
  const url = buildWhatsAppUrl({
    number: "573001234567",
    couple: "X y Y",
    greeting: "Ana",
    attending: [],
    declining: ["Ana"],
    note: "Los queremos",
  });
  const text = decodeURIComponent(url.split("text=")[1]);
  assert.match(text, /No podrá asistir: Ana/);
  assert.match(text, /Mensaje: Los queremos/);
});

test("buildWhatsAppUrl without number lets the user pick the contact", () => {
  const url = buildWhatsAppUrl({
    number: "",
    couple: "X y Y",
    greeting: "Ana",
    attending: ["Ana"],
    declining: [],
    note: "",
  });
  assert.ok(url.startsWith("https://wa.me/?text="));
});

test("buildCalendarUrl is null until the date is confirmed", () => {
  assert.equal(buildCalendarUrl({ title: "t", startISO: null }), null);
});

test("buildCalendarUrl builds UTC dates and defaults the end to +5h", () => {
  const url = buildCalendarUrl({
    title: "Boda",
    startISO: "2027-01-02T16:00:00-05:00",
    endISO: null,
    location: "Lugar",
  });
  assert.match(url, /dates=20270102T210000Z%2F20270103T020000Z/);
  assert.match(url, /text=Boda/);
  assert.match(url, /location=Lugar/);
});

test("buildMapUrl is null until the place is confirmed", () => {
  assert.equal(buildMapUrl(null), null);
  assert.equal(buildMapUrl(""), null);
  assert.match(buildMapUrl("Hacienda X"), /query=Hacienda%20X$/);
});
