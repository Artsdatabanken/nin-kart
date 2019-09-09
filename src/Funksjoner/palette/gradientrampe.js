import tinycolor from "tinycolor2";
import colorArray2Image from "./colorArray2Image";

function lagGradientRampe(barna, opplystKode, mode) {
  if (!barna) return lagGradientRampeUtenBarn(opplystKode, mode);
  //let opplystLevel = -1;
  let steps = [];
  barna.forEach(b => {
    //const key = b.kode;
    let levels = b.normalisertVerdi;
    if (levels === undefined) return;
    if (!Array.isArray(levels)) levels = [levels, levels];
    let [min, max] = levels;
    if (max < 255) max = Math.max(0, max - 1);
    //if (key === opplystKode) opplystLevel = [min, max];
    const erSynlig = b.erSynlig !== false;
    const farge = erSynlig ? b.farge : "#fff0";
    if (min <= 1 || mode === "diskret")
      steps.push({ level: min, color: farge });
    steps.push({ level: max, color: farge });
  });
  steps = steps.sort((a, b) => a.level - b.level);
  const cmap = buildGradient(steps);
  return colorArray2Image(cmap);
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
  return cmap;
}

function lagGradientRampeUtenBarn(opplyst, drawArgs) {
  const steps = [
    { level: 0, color: "#fff" },
    { level: 1, color: "#def" },
    { level: 64, color: "#bbb" },
    { level: 128, color: "#fed" },
    { level: 192, color: "#fff" },
    { level: 255, color: "#def" }
  ];
  const cmap = buildGradient(steps);
  return colorArray2Image(cmap);
}

export default lagGradientRampe;
