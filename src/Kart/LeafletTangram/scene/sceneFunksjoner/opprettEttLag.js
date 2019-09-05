import sladd from "./sladd";
import draw from "../visualisering/";

export default function opprettEttLag(drawArgs, config) {
  // MDIR-sladden
  if (sladd(drawArgs.url)) return {};

  const renderer = draw[drawArgs.aktivtFormat];
  const format = drawArgs.format[drawArgs.aktivtFormat];
  drawArgs.format = format;
  if (!renderer) {
    console.warn("Unknown kart format", drawArgs.aktivtFormat);
    return;
  }
  const source = renderer.lagSource(format, drawArgs);

  if (renderer.lagStyle) {
    const style = renderer.lagStyle(format, drawArgs);
    config.styles[style.name] = style.value;
  }
  config.sources[drawArgs.kode] = source;
  config.layers = Object.assign(config.layers, renderer.drawAll(drawArgs));
}
