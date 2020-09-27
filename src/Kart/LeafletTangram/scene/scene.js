import { createLights } from "./lights";
import { createStyles } from "./styles";
import lagTemp from "./sceneFunksjoner/lagTemp";
import lagAktiveLag from "./sceneFunksjoner/lagAktiveLag";
import lagNåværendeLag from "./sceneFunksjoner/lagNåværendeLag";

function createScene(props) {
  let config = {
    sources: {},
    cameras: {
      cam: {
        type: "flat",
      },
    },
    lights: createLights(),
    layers: {},
    styles: createStyles(),
    scene: { background: {} },
  };
  updateScene(config, props);
  return config;
}

function updateScene(config, props) {
  let lokalitetdata = props.lokalitetdata || null;
  let bakgrunn = props.aktiveLag.bakgrunnskart;
  bakgrunn = bakgrunn.kart.format[bakgrunn.kart.aktivtFormat];
  config.scene.background.color = bakgrunn.land_farge || "#f2f2f2";
  config.layers = {};
  const viserKatalog = !!props.meta; // meta = true or meta = false , never meta = null
  lagNåværendeLag(config, props);
  if (lokalitetdata !== null) {
    lagAktiveLag(lokalitetdata, true, props.opplyst, config);
  }
  lagAktiveLag(props.aktiveLag, viserKatalog, props.opplyst, config);
  lagTemp(config);
  console.log(config);
  return config;
}

export { createScene, updateScene };
