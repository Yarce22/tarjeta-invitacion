// Pure functions: no DOM access, so they can be tested with `node --test`.

export function joinNames(list) {
  if (list.length <= 1) return list.join("");
  return list.slice(0, -1).join(", ") + " y " + list[list.length - 1];
}

export function guestGreeting(guest) {
  return guest.greeting || joinNames(guest.people);
}

export function countdown(targetMs, nowMs) {
  if (targetMs == null) return null;
  let ms = Math.max(0, targetMs - nowMs);
  const days = Math.floor(ms / 864e5);
  ms -= days * 864e5;
  const hours = Math.floor(ms / 36e5);
  ms -= hours * 36e5;
  const minutes = Math.floor(ms / 6e4);
  return { days, hours, minutes, done: targetMs - nowMs <= 0 };
}

export function resolveGuest(hash, guests) {
  const code = (hash || "").replace(/^#/, "").toLowerCase();
  return Object.hasOwn(guests, code) ? guests[code] : null;
}

export function buildRequestUrl({ number, couple }) {
  const text = `¡Hola! Me gustaría solicitar mi invitación a la boda de ${couple}.\n\nMi nombre es: `;
  return `https://wa.me/${number || ""}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppUrl({ number, couple, greeting, attending, declining, note }) {
  let text = `¡Hola, ${couple}! Les escribe ${greeting} para confirmar la invitación a su boda.\n\n`;
  if (attending.length) text += `${attending.length > 1 ? "Asistirán" : "Asistirá"}: ${joinNames(attending)}\n`;
  if (declining.length) text += `No ${declining.length > 1 ? "podrán" : "podrá"} asistir: ${joinNames(declining)}\n`;
  if (note) text += `\nMensaje: ${note}\n`;
  return `https://wa.me/${number || ""}?text=${encodeURIComponent(text)}`;
}

const toUtcStamp = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function buildCalendarUrl({ title, startISO, endISO, location }) {
  if (!startISO) return null;
  const end = endISO || new Date(new Date(startISO).getTime() + 5 * 36e5).toISOString();
  const params = [
    "action=TEMPLATE",
    "text=" + encodeURIComponent(title),
    "dates=" + encodeURIComponent(`${toUtcStamp(startISO)}/${toUtcStamp(end)}`),
  ];
  if (location) params.push("location=" + encodeURIComponent(location));
  return "https://calendar.google.com/calendar/render?" + params.join("&");
}

export function buildMapUrl(query) {
  if (!query) return null;
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
}
