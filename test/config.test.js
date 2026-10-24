import { test } from "node:test";
import assert from "node:assert/strict";
import { GUESTS } from "../js/config.js";

test("every guest code is a URL-safe slug", () => {
  for (const code of Object.keys(GUESTS)) assert.match(code, /^[a-z0-9]+(-[a-z0-9]+)*$/, code);
});

test("every invitation lists at least one person, without blanks or repeats", () => {
  for (const [code, guest] of Object.entries(GUESTS)) {
    assert.ok(guest.people.length > 0, code);
    assert.ok(guest.people.every((p) => p.trim()), code);
    assert.equal(new Set(guest.people).size, guest.people.length, code);
  }
});
