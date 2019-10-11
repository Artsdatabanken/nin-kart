import lagTegner from "./lagTegner";
import { lagTerreng } from "../terreng";

export default function byggLag(lag, opplyst, config) {
  // console.log("skal prøve å bygge ",lag.kode)
  const viz = lag.kart.format[lag.kart.aktivtFormat];
  // console.log( "visualiseringen er: ", viz)
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
    opacity: lag.opacity || "1",
    blendmode: lag.blendmode || "multiply",
    depth: lag.depth, // TODO: flytt
    visBarn: lag.visBarn || !!lag.barn
  };
  if (drawArgs.visBarn) {
    drawArgs.barn = lag.barn;
    drawArgs.opplystBarn = lag.barn.find(x => x.kode === opplyst.kode);
    // console.log("har barn å vise", drawArgs.barn)
  }
  lagTegner(drawArgs, config);
  if (viz.kanHaTerreng) {
    lagTerreng(lag.terreng, opplyst.kode, config);
  }
}
