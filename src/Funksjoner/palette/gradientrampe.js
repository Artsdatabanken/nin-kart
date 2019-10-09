import tinycolor from "tinycolor2";
import colorArray2Image from "./colorArray2Image";

function lagGradientRampe(barna, opplystKode, mode, blendmode, opacity) {
  if (!barna)
    return lagGradientRampeUtenBarn(opplystKode, mode, blendmode, opacity);
  //let opplystLevel = -1;
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

function lagGradientRampeUtenBarn(opplyst, drawArgs, blendmode, opacity) {
  const steps = [
    { level: 0, color: "#fff0" },
    { level: 1, color: "#def" },
    { level: 64, color: "#bbb" },
    { level: 128, color: "#fed" },
    { level: 192, color: "#fff0" },
    { level: 255, color: "#def" }
  ];
  const cmap = buildGradient(steps);
  return colorArray2Image(cmap, blendmode, opacity);
}

export default lagGradientRampe;
