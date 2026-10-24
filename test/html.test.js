import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { WEDDING } from "../js/config.js";

// The <head> is static so link-preview crawlers can read it; guard it against drifting from config.js.
const head = readFileSync(new URL("../index.html", import.meta.url), "utf8").split("</head>")[0];
const couple = `${WEDDING.partnerA} y ${WEDDING.partnerB}`;

const tag = (attr, name) => {
  const match = head.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`));
  assert.ok(match, `missing meta ${name}`);
  return match[1];
};

test("title and preview tags name the couple", () => {
  assert.match(head, new RegExp(`<title>${couple}`));
  for (const [attr, name] of [["name", "description"], ["property", "og:site_name"], ["property", "og:title"]]) {
    assert.ok(tag(attr, name).includes(couple), name);
  }
});

test("preview descriptions show the configured date and venue", () => {
  const date = new Intl.DateTimeFormat("es-CO", { timeZone: WEDDING.timeZone, dateStyle: "long" })
    .format(new Date(WEDDING.dateISO));
  for (const [attr, name] of [["name", "description"], ["property", "og:description"]]) {
    assert.ok(tag(attr, name).includes(date), `${name} should include "${date}"`);
    assert.ok(tag(attr, name).includes(WEDDING.venues[0].name), `${name} should include the venue`);
  }
});
