import { createLights } from "./lights";
import { createStyles } from "./styles";
import { lagTerreng } from "./terreng";
import draw from "./visualisering/";
import sysconfig from "Funksjoner/config";

// Opplyst refererer i koden til et lag som ved mouse hover i menyen lyser opp, og derav gjør de andre lagene gjemt.

function lagAktiveLag(aktive, viserKatalog, opplyst, config) {
  Object.keys(aktive).forEach(kode =>
    lagEttLag(aktive[kode], opplyst, viserKatalog, config)
  );
}

function lagEttLag(lag, opplyst, viserKatalog, config) {
  if (!lag.erSynlig && opplyst.kode !== lag.kode) return;
  opprettAktivtLag(lag, opplyst, config, viserKatalog);
}

function opprettAktivtLag(lag, opplyst, config, viserKatalog) {
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
  opprettEttLag(drawArgs, config);
  if (viz.kanHaTerreng) {
    lagTerreng(lag.terreng, opplyst.kode, config);
  }
}

function sladd(url) {
  if (!url) return false;
  if (url.indexOf("Terreng") >= 0) return false;
  if (url.indexOf("Regional_naturvariasjon") >= 0) return false;
  if (url.indexOf("Erosjon") >= 0) return false;
  if (url.indexOf("Finmat") >= 0) return false;
  if (url.indexOf("Sediment") >= 0) return false;
  if (url.indexOf("Ultrama") >= 0) return false;
  if (url.indexOf("Kalk") >= 0) return false;
  if (url.indexOf("Natur_i_Norge/Natursystem") >= 0) return true;
  return false;
}

function opprettEttLag(drawArgs, config) {
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

function lagToppnivå(props) {
  const config = {
    sources: {},
    cameras: {
      cam: {
        type: "flat"
      }
    },
    lights: createLights(),
    layers: {},
    styles: createStyles(),
    scene: { background: {} }
  };
  return config;
}

function createScene(props) {
  let config = lagToppnivå(props);
  updateScene(config, props);
  return config;
}

function updateScene(config, props) {
  const bakgrunn = props.aktiveLag.bakgrunnskart;
  const bak = bakgrunn.kart.format[bakgrunn.kart.aktivtFormat];
  config.scene.background.color = bak.land_farge || "#f2f2f2";

  config.layers = {};
  const meta = props.meta;
  const viserKatalog = !!meta;
  if (meta) {
    const metakode = meta.kode;
    const aktiv = props.aktiveLag[metakode];
    const erSynlig = aktiv ? aktiv.erSynlig : true;
    if (viserKatalog && erSynlig && props.show_current)
      opprettAktivtLag(meta, props.opplyst, config, true);
  }
  lagAktiveLag(props.aktiveLag, viserKatalog, props.opplyst, config);

  lagTemp(config);
  return config;
}

function lagTemp(config) {
  if (!sysconfig.feature.comboSøk) return false;
  const l = {
    data: { source: "AND" },
    OR_MD: {
      data: { source: "AND" },
      draw: {
        points: {
          size: "function() { return (feature.size) * 3 }",
          texture: "/blue.png"
          //          'https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/bilde%2Favatar%2F40%2FOR_MD.png?alt=media',
        }
      }
    }
  };

  config.layers.AND = l;
  config.sources.AND = {
    type: "GeoJSON",
    //    url: `http://localhost:8000/dekning.geojson?kode=MI_KA-A&kode=NA_I1`,
    url: `http://localhost:8000/dekning.geojson?kode=NA_I1&kode=MI_KA-B`
  };
}
export { createScene, updateScene };
