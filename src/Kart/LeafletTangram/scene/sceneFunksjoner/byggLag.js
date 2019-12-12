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
    blendmode: lag.blendmode || "overlay",
    depth: lag.depth, // TODO: flytt
    visBarn: lag.visBarn || !!lag.barn
  };
  drawArgs.barn = drawArgs.visBarn ? lag.barn || [] : [];
  if (lag.palett) drawArgs.palett = lag.palett;

  if (drawArgs.barn.length <= 0) {
    drawArgs.barn = [
      {
        kode: lag.kode,
        farge: lag.farge,
        erSynlig: lag.erSynlig,
        normalisertVerdi: lag.normalisertVerdi
        //          aktivtKart.intervall && aktivtKart.intervall.normalisertVerdi
      }
    ];
    const aktivtKart = drawArgs.format[drawArgs.aktivtFormat];
    const nv =
      lag.normalisertVerdi ||
      (aktivtKart.intervall && aktivtKart.intervall.normalisertVerdi);
    if (nv) {
      drawArgs.barn[0].normalisertVerdi = [nv[0], nv[0]];
      drawArgs.barn.push({
        kode: lag.kode,
        farge: lag.farge0,
        erSynlig: lag.erSynlig,
        normalisertVerdi: [nv[1], nv[1]]
        //          aktivtKart.intervall && aktivtKart.intervall.normalisertVerdi
      });
    }
  }
  drawArgs.opplystBarn = drawArgs.barn.find(x => x.kode === opplyst.kode);
  lagTegner(drawArgs, config);
  if (viz.kanHaTerreng) {
    lagTerreng(lag.terreng, opplyst.kode, config);
  }
}
