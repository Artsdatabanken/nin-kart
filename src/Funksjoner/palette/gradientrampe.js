import tinycolor from "tinycolor2";
import colorArray2Image from "./colorArray2Image";

function lagGradientRampe(barna, opplystKode, mode, blendmode, opacity) {
  let steps = [];
  barna.forEach(b => {
    if (!b.farge) console.warn("Manger farge for " + b.kode);
    let levels = b.normalisertVerdi;
    if (levels === undefined) return;
    if (!Array.isArray(levels)) levels = [levels, levels];
    let [min, max] = levels;
    if (max < 255) max = Math.max(0, max - 1);
    const erSynlig = b.erSynlig !== false;
    const farge = erSynlig ? b.farge : "#fff0";
    if (min <= 1 || mode === "diskret")
      steps.push({ level: min, color: farge });
    steps.push({ level: max, color: farge });
  });
  steps = steps.sort((a, b) => a.level - b.level);
  return steps2Palette(steps, blendmode, opacity);
}

function steps2Palette(steps, blendmode = "multiply", opacity = 100) {
  console.log(steps);
  const cmap = buildGradient(steps);
  return colorArray2Image(cmap, blendmode, opacity);
}

function buildGradient(steps, opplystLevel = -1) {
  const cmap = [];
  for (let i = 0; i < steps.length - 1; i++) {
    const a = steps[i];
    const b = steps[i + 1];
    for (let ci = Math.trunc(a.level); ci <= Math.trunc(b.level); ci++) {
      let weight = (100 * (ci - a.level)) / (b.level - a.level);
      weight = Math.max(0, Math.min(100, weight));
      let tc = tinycolor.mix(a.color, b.color, weight);
      cmap[ci] = tc.toHexString();
    }
  }
  return cmap;
}

export { steps2Palette, lagGradientRampe };
