import tinycolor from "tinycolor2";
import { lagBakgrunnskart } from "./bakgrunnskart";
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
  switch (lag.type) {
    case "bakgrunn":
      lagBakgrunnskart(lag, opplystKode, config);
      break;
    case "terreng":
      lagTerreng(lag.terreng, opplystKode, config);
      break;
    default:
      opprettAktivtLag(lag, opplystKode, config, viserKatalog);
  }
}

function opprettEttLag(drawArgs, config) {
  if (drawArgs.opplystKode && !opplystKodeErBarnAvAktivtLag(drawArgs)) return; // Hide this layer while highlighting other layer

  const renderer = draw[drawArgs.aktivtKartformat];
  const kartformat = drawArgs.kartformat[drawArgs.aktivtKartformat];
  if (!renderer) {
    console.warn("Unknown kartformat", drawArgs.aktivtKartformat);
    return;
  }
  const source = renderer.lagSource(
    kartformat.url,
    drawArgs.bbox,
    kartformat.zoom
  );

  if (renderer.lagStyle) {
    const style = renderer.lagStyle(renderer, drawArgs);
    config.styles[style.name] = style.value;
  }
  config.sources[drawArgs.kode] = source;
  config.layers[drawArgs.kode] = renderer.drawAll(drawArgs);
}

function opplystKodeErBarnAvAktivtLag(drawArgs) {
  return (
    drawArgs.opplystKode.startsWith(drawArgs.kode) ||
    (drawArgs.opplystKode.includes("-C-") && drawArgs.kode.includes("-E-"))
  );
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
    visBarn: lag.visBarn
  };
  if (lag.visBarn) {
    drawArgs.barn = lag.barn;
  }
  opprettEttLag(drawArgs, config);
}

function lagToppnivå(props) {
  const config = {
    sources: {
      osm: sysconfig.createTileSource(
        sysconfig.storageUrl +
          "Bakgrunnskart/OpenStreetMap/polygon.3857.mbtiles",
        "MVT",
        [0, 14]
      )
    },
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
  config.scene.background.color = bakgrunn.land
    ? bakgrunn.land_farge
    : "#f2f2f2";
  config.layers = {};
  const meta = props.meta;
  const viserKatalog = !!meta;
  if (viserKatalog) {
    const kartformat = meta.kartformat;
    if (!kartformat) {
      console.warn("No map data source found.");
      return config;
    }
    let aktivtKartformat = Object.keys(kartformat)[0];
    if (kartformat.polygon) aktivtKartformat = "polygon";
    if (kartformat["raster.indexed"]) aktivtKartformat = "raster.indexed";
    if (kartformat["raster.gradient"]) aktivtKartformat = "raster.gradient";
    const drawArgs = {
      kode: meta.kode,
      url: meta.url,
      barn: meta.barn && meta.barn.length > 0 ? meta.barn : [meta],
      opplystKode: props.opplystKode,
      bbox: meta.bbox,
      aktivtKartformat: aktivtKartformat,
      kartformat: kartformat,
      visBarn: true,
      filterMin: 0.0,
      filterMax: 1.0
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
