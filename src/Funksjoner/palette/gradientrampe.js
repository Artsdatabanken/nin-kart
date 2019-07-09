import tinycolor from "tinycolor2";
import colorArray2Image from "./colorArray2Image";

function lagSteg(barna, opplystKode, mode) {
  let r = { steps: [] };
  barna.forEach(b => {
    const key = b.kode;
    let levels = b.normalisertVerdi;
    if (levels === undefined) return;
    if (!Array.isArray(levels)) levels = [levels, levels];
    let [min, max] = levels;
    if (max < 255) max = Math.max(0, max - 1);
    if (key === opplystKode) r.opplystLevel = [min, max];
    if (min <= 1 || mode === "diskret")
      r.steps.push({ level: min, color: b.farge });
    r.steps.push({ level: max, color: b.farge });
  });
  r.steps = r.steps.sort((a, b) => a.level - b.level);
  return r;
}

function lagGradientRampe(barna, opplystKode, mode) {
  const r = lagSteg(barna, opplystKode, mode);
  const steps = r.steps;
  let opplystLevel = -1;
  const cmap = [];
  for (let i = 0; i < steps.length - 1; i++) {
    const a = steps[i];
    const b = steps[i + 1];
    for (let ci = Math.trunc(a.level); ci <= Math.trunc(b.level); ci++) {
      let weight = (100 * (ci - a.level)) / (b.level - a.level);
      weight = Math.max(0, Math.min(100, weight));
      let tc = tinycolor.mix(a.color, b.color, weight);
      if (opplystLevel !== -1) {
        if (opplystLevel.length < 2)
          opplystLevel = [opplystLevel[0] - 5, opplystLevel[0] + 5];

        if (ci < opplystLevel[0] || ci > opplystLevel[1])
          tc = tc.lighten(10).desaturate(100);
        //        else tc = tc.darken(30); //.saturate(40);
      }
      cmap[ci] = tc.toHexString();
    }
  }

  const palette = colorArray2Image(cmap);
  return palette;
}

export default lagGradientRampe;
