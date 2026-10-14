// Single place to edit the wedding details.
// Anything set to null / empty is rendered as "por confirmar" and the
// features that depend on it (countdown, map, calendar) stay hidden.

export const WEDDING = {
  partnerA: "Jhonnatan",
  partnerB: "Juan Jose",

  // Confirm these when ready, e.g. "2027-03-20T16:00:00-05:00" (Colombia time).
  dateISO: null,
  endISO: null,
  timeZone: "America/Bogota",
  rsvpDeadline: null, // e.g. "20 de febrero"

  // WhatsApp of the couple: country code + number, no "+" or spaces. e.g. "573001234567".
  // Empty = WhatsApp opens and lets the guest pick the contact.
  whatsapp: "573004429998",

  // Set `name` / `address` when the venue is confirmed. `time` is free text, e.g. "4:00 p. m.".
  venues: [
    { title: "Ceremonia", time: null, name: null, address: null },
    { title: "Recepción", time: null, name: null, address: null },
  ],
  mapQuery: null, // e.g. "Hacienda El Roble, Cerritos, Pereira"

  // `time: null` renders as "Por definir".
  schedule: [
    { time: null, title: "Llegada de invitados", detail: "" },
    { time: null, title: "Ceremonia", detail: "" },
    { time: null, title: "Cóctel y fotos", detail: "" },
    { time: null, title: "Cena", detail: "" },
    { time: null, title: "Fiesta", detail: "" },
  ],

  dressCode: {
    type: "Por confirmar",
    detail: "Pronto compartiremos el código de vestimenta.",
    colors: [], // e.g. ["#2f4a3f", "#7b8f6a", "#c9b38a"]
    note: "",
  },
};

// One entry per invitation. Link per guest = page URL + #code (e.g. ...#familia-gomez).
// Use only letters, numbers and hyphens in the code. The first entry is the default.
// `greeting` is optional (e.g. "Familia Gómez"); without it the envelope and the
// WhatsApp message use the people's names.
// NOTE: sample data — replace with the real list.
export const GUESTS = {
  "familia-gomez": { greeting: "Familia Gómez Restrepo", people: ["Carlos Gómez", "Lucía Restrepo"] },
  "ana-maria": { people: ["Ana María Ospina"] },
  "julian-y-sara": { people: ["Julián Arango", "Sara Jaramillo"] },
};
