import tinycolor from "tinycolor2";

const farger = {
  AO: "hsl(0, 0%, 50%)",
  BS: "hsl(240, 40%, 50%)",
  MI: "hsl(32, 40%, 50%)",
  LA: "hsl(190, 40%, 50%)",
  NA: "hsl(120, 40%, 50%)",
  OR: "hsl(0, 0%, 50%)",
  RL: "hsl(12, 40%, 50%)",
  VV: "hsl(300, 40%, 50%)",
  "Natur_i_Norge/Landskap": "hsl(190, 40%, 50%)",
  "Natur_i_Norge/Fylke": "hsl(0, 0%, 50%)",
  "Natur_i_Norge/Natursystem": "hsl(120, 40%, 50%)",
  "Natur_i_Norge/Natursystem/Beskrivelsessystem": "hsl(240, 40%, 50%)",
  "Natur_i_Norge/Natursystem/Lokale_komplekse_miljøvariabler":
    "hsl(32, 40%, 50%)",
  "Natur_i_Norge/Datakilde": "hsl(345, 30%, 50%)",
  "Natur_i_Norge/Art/Truet": "hsl(12, 40%, 50%)",
  "Natur_i_Norge/Naturvernområde": "hsl(300, 40%, 50%)"
};

const palett = {
  lysere: {},
  lys: {},
  medium: {},
  mørk: farger
};
Object.keys(farger).forEach(prefiks => {
  palett.lysere[prefiks] = tinycolor(farger[prefiks])
    .desaturate(10)
    .lighten(40)
    .setAlpha(0.95)
    .toHslString();
  palett.lys[prefiks] = tinycolor(farger[prefiks])
    .lighten(40)
    .setAlpha(0.95)
    .toHslString();
  palett.medium[prefiks] = tinycolor(farger[prefiks])
    .lighten(10)
    //    .setAlpha(0.95)
    .toHslString();
});

function kontrastfarge(farge) {
  const tc = new tinycolor(farge);
  return tc.getLuminance() > 0.6
    ? "rgba(0,0,0,0.77)"
    : "rgba(255,255,255,0.77)";
}

export { kontrastfarge, palett };
