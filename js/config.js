// Single place to edit the wedding details.
// Anything set to null / empty is rendered as "por confirmar" and the
// features that depend on it (countdown, map, calendar) stay hidden.

export const WEDDING = {
  partnerA: "Jhonnatan",
  partnerB: "Juan Jose",

  // ISO with Colombia offset, e.g. "2027-03-20T16:00:00-05:00".
  dateISO: "2027-02-28T17:00:00-05:00",
  endISO: null,
  timeZone: "America/Bogota",
  rsvpDeadline: null, // e.g. "20 de febrero"

  // WhatsApp of the couple: country code + number, no "+" or spaces. e.g. "573001234567".
  // Empty = WhatsApp opens and lets the guest pick the contact.
  whatsapp: "573004429998",

  // Set `name` / `address` when the venue is confirmed. `time` is free text, e.g. "4:00 p. m.".
  venues: [
    { title: "Ceremonia y recepción", time: "5:00 p. m.", name: "Finca La Gran Bélgica", address: null },
  ],
  mapQuery: "Finca La Gran Bélgica", // e.g. "Hacienda El Roble, Cerritos, Pereira"

  // Background music, starts when the guest opens the envelope. null = no music.
  music: "audio/marcha-imperial.mp3",

  dressCode: {
    type: "Paleta de colores",
    detail: "Te invitamos a vestir en tonos inspirados en la naturaleza: suaves, cálidos y atemporales.",
    colors: [
      { name: "Sage Green", hex: "#98A086" },
      { name: "Dusty Rose", hex: "#A76D5E" },
      { name: "Golden Tan", hex: "#C4A071" },
      { name: "Warm Beige", hex: "#DFCCB1" },
      { name: "Terracotta Brown", hex: "#846044" },
    ],
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
