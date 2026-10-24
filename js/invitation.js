import { WEDDING, GUESTS } from "./config.js";
import {
  joinNames,
  countdown,
  resolveGuest,
  buildWhatsAppUrl,
  buildCalendarUrl,
  buildMapUrl,
  guestGreeting,
} from "./logic.js";

const $ = (id) => document.getElementById(id);
const guest = resolveGuest(location.hash, GUESTS);
const greeting = guestGreeting(guest);
const couple = `${WEDDING.partnerA} y ${WEDDING.partnerB}`;
const targetMs = WEDDING.dateISO ? new Date(WEDDING.dateISO).getTime() : null;

/* ----- Envelope ----- */
$("recipient").textContent = greeting;

// Long greetings shrink until they fit the space between the seal and the envelope edge.
function fitRecipient() {
  const name = $("recipient");
  const pocket = name.parentElement;
  const style = getComputedStyle(pocket);
  const room = pocket.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
  const used = () => pocket.querySelector(".to").offsetHeight + parseFloat(style.rowGap) + name.offsetHeight;
  name.style.fontSize = "";
  let size = parseFloat(getComputedStyle(name).fontSize);
  while (used() > room && size > 12) {
    size -= 1;
    name.style.fontSize = `${size}px`;
  }
}
fitRecipient();
document.fonts.ready.then(fitRecipient);
addEventListener("resize", fitRecipient);

$("letterNames").textContent = `${WEDDING.partnerA[0]} & ${WEDDING.partnerB[0]}`;
$("initials").textContent = `${WEDDING.partnerA[0]}·${WEDDING.partnerB[0]}`;

/* ----- Cover ----- */
$("partnerA").textContent = WEDDING.partnerA;
$("partnerB").textContent = WEDDING.partnerB;
$("signature").textContent = `${WEDDING.partnerA} & ${WEDDING.partnerB}`;

if (targetMs !== null) {
  const fmt = (opts) => new Intl.DateTimeFormat("es-CO", { timeZone: WEDDING.timeZone, ...opts }).format(targetMs);
  $("dWeekday").textContent = fmt({ weekday: "long" });
  $("dDay").textContent = fmt({ day: "numeric" });
  $("dMonth").textContent = fmt({ month: "long" });
  $("dYear").textContent = fmt({ year: "numeric" });
  for (const id of ["bigDate", "dYear", "countdown"]) $(id).hidden = false;
  $("dateTbc").hidden = true;

  const tick = () => {
    const c = countdown(targetMs, Date.now());
    $("cDays").textContent = c.days;
    $("cHours").textContent = c.hours;
    $("cMinutes").textContent = c.minutes;
  };
  tick();
  setInterval(tick, 30000);
}

/* ----- Venues ----- */
const text = (value, fallback) => value || fallback;
function el(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content != null) node.textContent = content;
  return node;
}

// A single confirmed venue becomes the section title instead of repeating below.
const singleVenue = WEDDING.venues.length === 1 && WEDDING.venues[0].name;
if (singleVenue) $("whereTitle").textContent = WEDDING.venues[0].name;

for (const v of WEDDING.venues) {
  const box = el("div");
  box.append(el("span", "time", text(v.time, "Hora por confirmar")), el("h3", null, v.title));
  if (!singleVenue) box.append(el("p", null, text(v.name, "Lugar por confirmar")));
  if (v.address) box.append(el("p", "soft-note", v.address));
  $("venues").append(box);
}
if (WEDDING.venueNote) $("venues").append(el("p", "soft-note", WEDDING.venueNote));

const mapUrl = buildMapUrl(WEDDING.mapQuery);
if (mapUrl) { $("mapLink").href = mapUrl; $("mapLink").hidden = false; }
const calUrl = buildCalendarUrl({
  title: `Boda de ${couple}`,
  startISO: WEDDING.dateISO,
  endISO: WEDDING.endISO,
  location: WEDDING.mapQuery,
});
if (calUrl) { $("calendarLink").href = calUrl; $("calendarLink").hidden = false; }

/* ----- Dress code ----- */
const dress = WEDDING.dressCode;
$("dressTitle").textContent = dress.type;
$("dressDetail").textContent = dress.detail;
$("dressNote").textContent = dress.note;
$("dressNote").hidden = !dress.note;
$("palette").hidden = dress.colors.length === 0;
for (const color of dress.colors) {
  const swatch = el("span", "swatch");
  swatch.style.background = color.hex;
  const item = el("figure");
  item.append(swatch, el("figcaption", null, color.name));
  $("palette").append(item);
}

/* ----- RSVP ----- */
const n = guest.people.length;
const reserved = $("reserved");
if (n === 1) {
  reserved.append(
    "Hemos reservado con mucho cariño ",
    el("strong", null, "un lugar a tu nombre"),
    ". Queremos vivir este día en un ambiente íntimo, por eso esta invitación es personal. Gracias por entenderlo.",
  );
} else {
  reserved.append(
    "Hemos reservado con mucho cariño ",
    el("strong", null, `${n} lugares`),
    ` para ${joinNames(guest.people)}. Queremos vivir este día en un ambiente íntimo, por eso la invitación es para las personas aquí mencionadas. Gracias por entenderlo.`,
  );
}
if (WEDDING.rsvpDeadline) {
  $("deadline").textContent = `Por favor confirma antes del ${WEDDING.rsvpDeadline}.`;
  $("deadline").hidden = false;
}

const attends = guest.people.map(() => true);
guest.people.forEach((person, i) => {
  const row = el("div", "row");
  const group = el("span", "choice");
  group.setAttribute("role", "group");
  group.setAttribute("aria-label", `Asistencia de ${person}`);
  const yes = el("button", "yes", "Asistirá");
  const no = el("button", "no", "No podrá");
  for (const [btn, value] of [[yes, true], [no, false]]) {
    btn.type = "button";
    btn.setAttribute("aria-pressed", String(value));
    btn.addEventListener("click", () => {
      attends[i] = value;
      yes.setAttribute("aria-pressed", String(value));
      no.setAttribute("aria-pressed", String(!value));
      refreshRsvp();
    });
  }
  no.setAttribute("aria-pressed", "false");
  group.append(yes, no);
  row.append(el("span", "person", person), group);
  $("guestList").append(row);
});
$("note").addEventListener("input", refreshRsvp);

function refreshRsvp() {
  const attending = guest.people.filter((_, i) => attends[i]);
  const declining = guest.people.filter((_, i) => !attends[i]);
  $("wppButton").href = buildWhatsAppUrl({
    number: WEDDING.whatsapp,
    couple,
    greeting,
    attending,
    declining,
    note: $("note").value.trim(),
  });
  $("summary").textContent =
    attending.length === n ? `Confirmarás la asistencia de ${n === 1 ? "tu lugar" : "las " + n + " personas"}.`
    : attending.length === 0 ? "Avisarás que no podrán asistir. ¡Gracias por contarnos!"
    : `Confirmarás ${attending.length} de ${n} lugares.`;
}
refreshRsvp();

if (WEDDING.whatsapp) {
  const pretty = "+" + WEDDING.whatsapp.replace(/^(\d{2})(\d{3})(\d{3})(\d+)$/, "$1 $2 $3 $4");
  $("phone").textContent = pretty;
  $("contact").hidden = false;
  $("copy").addEventListener("click", async () => {
    const btn = $("copy");
    try {
      await navigator.clipboard.writeText(pretty);
      btn.textContent = "Copiado";
      setTimeout(() => (btn.textContent = "Copiar número"), 1800);
    } catch {
      const range = document.createRange();
      range.selectNodeContents($("phone"));
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });
}

/* ----- Background music ----- */
// Browsers block autoplay, so it starts on the seal click (a user gesture).
const music = $("music");
const toggle = $("musicToggle");
function startMusic() {
  if (!WEDDING.music) return;
  music.src = WEDDING.music;
  music.play().then(() => { toggle.hidden = false; }).catch(() => {});
}
let mutedByUser = false;
let pausedByHide = false;
toggle.addEventListener("click", () => {
  if (music.paused) music.play().catch(() => {});
  else music.pause();
  mutedByUser = music.paused;
  toggle.setAttribute("aria-pressed", String(!music.paused));
});

// Stop playback when the guest leaves: visibilitychange covers tab/app switches,
// pagehide covers navigation and closing (more reliable than beforeunload on mobile).
// Only resume on return if it was this auto-stop that paused it, not a manual toggle-off.
// visibilitychange and pagehide can both fire for the same hide, so only latch
// pausedByHide when music was still playing — a second call must not clear it.
function stopMusic() {
  if (!music.paused) pausedByHide = true;
  music.pause();
  toggle.setAttribute("aria-pressed", "false");
}
function resumeMusic() {
  if (!pausedByHide || mutedByUser) return;
  pausedByHide = false;
  music.play().then(() => { toggle.setAttribute("aria-pressed", "true"); }).catch(() => {});
}
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopMusic();
  else resumeMusic();
});
window.addEventListener("pagehide", stopMusic);

/* ----- Envelope opening ----- */
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1;
$("seal").addEventListener("click", () => {
  startMusic();
  const envelope = $("envelope");
  const scene = $("scene");
  scene.classList.add("opened");
  envelope.classList.add("opening");
  setTimeout(() => envelope.classList.add("flap-behind"), 420 * reduced);
  setTimeout(() => envelope.classList.add("pulling"), 800 * reduced);
  setTimeout(() => scene.classList.add("leaving"), 2000 * reduced);
  setTimeout(() => {
    scene.hidden = true;
    $("invitation").hidden = false;
    window.scrollTo(0, 0);
  }, 2650 * reduced);
});
