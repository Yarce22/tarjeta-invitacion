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
  rsvpDeadline: "20 de diciembre", // shown as "Por favor confirma antes del ..."

  // WhatsApp of the couple: country code + number, no "+" or spaces. e.g. "573001234567".
  // Empty = WhatsApp opens and lets the guest pick the contact.
  whatsapp: "573004429998",

  // Set `name` / `address` when the venue is confirmed. `time` is free text, e.g. "4:00 p. m.".
  venues: [
    { title: "Ceremonia y recepción", time: "5:00 p. m.", name: "Finca La Gran Bélgica", address: null },
  ],
  mapQuery: "Finca La Gran Bélgica", // e.g. "Hacienda El Roble, Cerritos, Pereira"

  // Background music, starts when the guest opens the envelope. null = no music.
  music: "audio/para-siempre.mp3",

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
// Use only lowercase letters, numbers and hyphens in the code. Unknown codes show the public landing.
// `greeting` is optional (e.g. "Familia Gómez"); without it the envelope and the
// WhatsApp message use the people's names.
// Source: MATRIMONIO.xlsx. Unknown names use a placeholder tied to the host ("Hijo/a de ...").
export const GUESTS = {
  "mama": { greeting: "Mamá", people: ["Mamá"] },
  "damian-y-juanita": { people: ["Damián", "Juanita"] },
  "liliana-freddy-y-natalia": { people: ["Liliana", "Freddy", "Natalia"] },
  "abuela": { greeting: "Abuela", people: ["Abuela"] },
  "miller-e-ivon": { greeting: "Miller e Ivon", people: ["Miller", "Ivon"] },
  "pacheco-y-tia-jenny": {
    greeting: "Pacheco, Tía Jenny y familia",
    people: ["Pacheco", "Tía Jenny", "Hijo/a de Pacheco y Tía Jenny"],
  },
  "tia-estella": { people: ["Tía Estella"] },
  "tia-patricia-ansonny-y-denisson": { people: ["Tía Patricia", "Ansonny", "Denisson"] },
  "tio-hugo": { people: ["Tío Hugo"] },
  "tio-hector": { people: ["Tío Héctor"] },
  "julian-montoya": {
    greeting: "Julián Montoya y familia",
    people: ["Julián Montoya", "Señora de Julián Montoya", "Hijo/a de Julián Montoya 1", "Hijo/a de Julián Montoya 2"],
  },
  "leidy": { people: ["Leidy"] },
  "jorge-ivan": { people: ["Jorge Iván"] },
  "emanuel": { people: ["Emanuel"] },

  "papas": { greeting: "Papás", people: ["Papá", "Mamá"] },
  "hermano-clary-y-emiliana": { people: ["Hermano", "Clary", "Emiliana"] },
  "cami-y-nico": { people: ["Cami", "Nico"] },
  "tia-paty-santi": { people: ["Tía Paty", "Santiago"] },
  "tia-nena": { people: ["Tía Nena"] },
  "carlos-y-tia-olma": { people: ["Carlos", "Tía Olma"] },
  "cache-y-majo": { people: ["Cache", "Majo"] },
  "julio": { people: ["Julio"] },
  "oscar-y-tia-norma": { people: ["Óscar", "Tía Norma"] },
  "tio-ruben-y-glorita": { people: ["Tío Rubén", "Glorita"] },
  "tia-luz-elena": { people: ["Tía Luz Elena"] },
  "tia-maria-victoria-y-caro": { people: ["Tía María Victoria", "Caro"] },
  "luis-y-nana": { greeting: "Luis, Nana y familia", people: ["Luis", "Nana", "Hijo/a de Luis y Nana"] },
  "maicol-luisa-y-antonia": { people: ["Maicol", "Luisa", "Antonia"] },
  "andres-y-estefany": { people: ["Andrés", "Estefany"] },
  "andres-y-claudia": { greeting: "Andrés, Claudia y familia", people: ["Andrés", "Claudia", "Hija de Andrés y Claudia"] },
  "rolando-y-lu": { people: ["Rolando", "Lu"] },
  "mario-y-sandra": { people: ["Mario", "Sandra"] },
  "yu-y-alejito": { people: ["Yu", "Alejo"] },
  "madrina": { greeting: "Madrina", people: ["Madrina"] },
  "ruben": { people: ["Rubén"] },
  "mauricio": { people: ["Mauricio"] },
  "gabo-y-maleja": { people: ["Gabo", "Maleja"] },
  "raulito-e-isa": { greeting: "Raulito e Isa", people: ["Raulito", "Isa"] },
  "tana-y-diana": { people: ["Tana", "Diana"] },
  "alejito-y-jenny": { people: ["Alejito", "Jenny"] },
  "lina": { people: ["Lina"] },
  "nancy-y-juanse": { people: ["Nancy", "Juanse"] },
  "juanpa-y-valen": { people: ["Juanpa", "Valen"] },
  "luchy-y-andre": { people: ["Luchy", "Andre"] },
  "daniel-y-viky": { people: ["Daniel", "Viky"] },
  "julian": { people: ["Julián"] },
  "maria-mercedes": { people: ["María Mercedes"] },
  "natha": { people: ["Natha"] },
  "lucho-y-luisa": { people: ["Lucho", "Luisa"] },
  "jhon-y-angie": { people: ["Jhon", "Angie"] },
  "karen": { people: ["Karen"] },
  "monica": { people: ["Mónica"] },
  "memo-y-tata": { people: ["Memo", "Tata"] },
  "juanito-y-laura": { people: ["Juanito", "Amiguis Laura"] },
  "adri": { people: ["Amiguis Adri"] },
  "juli": { people: ["Amiguis Juli"] },
  "diego-y-beivi": { people: ["Diego", "Amigos Beivi"] },
  "luisa": { people: ["Luisa"] },
  "julian-y-yoselin": { greeting: "Julián, Yoselin y familia", people: ["Julián", "Yoselin", "Hijo/a de Julián y Yoselin"] },
};
