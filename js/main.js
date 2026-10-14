import { WEDDING, GUESTS } from "./config.js";
import { resolveGuest, buildRequestUrl } from "./logic.js";

// `/#code` with a known code opens the personal invitation; anything else shows the public landing.
if (resolveGuest(location.hash, GUESTS)) {
  document.getElementById("scene").hidden = false;
  await import("./invitation.js");
} else {
  document.getElementById("landing").hidden = false;
  document.getElementById("requestButton").href = buildRequestUrl({
    number: WEDDING.whatsapp,
    couple: `${WEDDING.partnerA} y ${WEDDING.partnerB}`,
  });
}

addEventListener("hashchange", () => location.reload());
