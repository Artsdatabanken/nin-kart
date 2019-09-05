import lagTegner from "./lagTegner";
import { lagTerreng } from "../terreng";

export default function byggLag(lag, opplyst, config) {
  const viz = lag.kart.format[lag.kart.aktivtFormat];
  if (!viz) return console.warn("No visualisation availiable for " + lag.url);
  let drawArgs = {
    forelderkode: lag.kode,
    kode: lag.kode,
    url: lag.url,
    farge: lag.farge,
    visEtiketter: lag.visEtiketter,
    opplyst: opplyst,
    bbox: lag.bbox,
    aktivtFormat: lag.kart.aktivtFormat,
    format: lag.kart.format,
    viz: viz,
    depth: lag.depth, // TODO: flytt
    visBarn: lag.visBarn || !!lag.barn
  };
  if (drawArgs.visBarn) {
    drawArgs.barn = lag.barn;
    drawArgs.opplystBarn = lag.barn.find(x => x.kode === opplyst.kode);
  }
  lagTegner(drawArgs, config);
  if (viz.kanHaTerreng) {
    lagTerreng(lag.terreng, opplyst.kode, config);
  }
}
