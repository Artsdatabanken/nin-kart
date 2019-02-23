import tinycolor from "tinycolor2";
import { createLights } from "./lights";
import { createStyles } from "./styles";
import { lagTerreng } from "./terreng";
import draw from "./visualisering/";
import sysconfig from "../../../config";

function lagAktiveLag(aktive, iKatalog, opplystKode, config) {
  Object.keys(aktive).forEach(kode =>
    lagEttLag(aktive[kode], opplystKode, iKatalog, config)
  );
}

function lagEttLag(lag, opplystKode, viserKatalog, config) {
  if (!lag.erSynlig && opplystKode !== lag.kode) return;
  opprettAktivtLag(lag, opplystKode, config, viserKatalog);
}

function opprettEttLag(drawArgs, config) {
  const renderer = draw[drawArgs.aktivtKartformat];
  const kartformat = drawArgs.kartformat[drawArgs.aktivtKartformat];
  drawArgs.kartformat = kartformat;
  if (!renderer) {
    console.warn("Unknown kartformat", drawArgs.aktivtKartformat);
    return;
  }
  const source = renderer.lagSource(kartformat, drawArgs.bbox);

  if (renderer.lagStyle) {
    const style = renderer.lagStyle(kartformat, drawArgs);
    config.styles[style.name] = style.value;
  }
  config.sources[drawArgs.kode] = source;
  config.layers = Object.assign(config.layers, renderer.drawAll(drawArgs));
}

function farge(farge, viserKatalog) {
  farge = viserKatalog
    ? tinycolor(farge)
        .lighten(20)
        .toRgbString()
    : farge;
  return farge;
}

function opprettAktivtLag(lag, opplystKode, config, viserKatalog) {
  const viz = lag.kartformat[lag.aktivtKartformat];
  let drawArgs = {
    forelderkode: lag.kode,
    kode: lag.kode,
    url: lag.url,
    farge: farge(lag.farge, viserKatalog),
    visEtiketter: lag.visEtiketter,
    opplystKode: opplystKode,
    bbox: lag.bbox,
    aktivtKartformat: lag.aktivtKartformat,
    kartformat: lag.kartformat,
    viz: viz,
    visBarn: lag.visBarn
  };
  if (lag.visBarn) {
    drawArgs.barn = lag.barn;
  }
  opprettEttLag(drawArgs, config);
  if (viz.kanHaTerreng) lagTerreng(lag.terreng, opplystKode, config);
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

function createScene(props: Object) {
  let config = lagToppnivå(props);
  updateScene(config, props);
  return config;
}

function updateScene(config: Object, props: Object) {
  const bakgrunn = props.aktiveLag.bakgrunnskart;
  const bak = bakgrunn.kartformat[bakgrunn.aktivtKartformat];
  config.scene.background.color = bak.land_farge ? bak.land_farge : "#f2f2f2";

  config.layers = {};
  const meta = props.meta;
  const viserKatalog = !!meta;
  if (viserKatalog) {
    const kartformat = meta.kartformat;
    if (!kartformat) {
      console.warn("No map data source found.");
      return config;
    }
    const drawArgs = {
      kode: meta.kode,
      url: meta.url,
      barn: meta.barn && meta.barn.length > 0 ? meta.barn : [meta],
      opplystKode: props.opplystKode,
      bbox: meta.bbox,
      aktivtKartformat: meta.aktivtKartformat,
      kartformat: kartformat,
      visBarn: true
    };
    opprettEttLag(drawArgs, config);
  }
  lagAktiveLag(props.aktiveLag, viserKatalog, props.opplystKode, config);
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
