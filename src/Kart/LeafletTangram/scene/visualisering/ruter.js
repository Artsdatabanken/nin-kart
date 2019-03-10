import sysconfig from "../../../../config";

function drawAll(drawArgs) {
  const layer = {
    [drawArgs.kode]: {
      data: { source: drawArgs.kode },
      draw: {
        ruter: {
          order: 700
        }
      }
    }
  };
  return layer;
}

function lagStyle(format, drawArgs) {
  //  const { opplystKode, barn } = drawArgs;
  //  const [visning] = drawArgs.format.visning;
  const gradient = {
    base: "raster",
    blend: "multiply",
    xblend: "overlay",
    fblend: "add",
    shaders: {
      uniforms: {},
      blocks: {
        color: `
        float value = 1.-sampleRaster(0).r;
        vec4 transparent = vec4(1.,1.,1.,1.);
        float v = value*value;
        color = vec4(1., v, v, 1.);
//        color = mix(transparent, color, value.a);`
      }
    }
  };
  return {
    name: "ruter",
    value: gradient
  };
}

function lagSource({ url, zoom }, bbox) {
  return sysconfig.createTileSource(url, "Raster", zoom, bbox);
}

export default { drawAll, lagSource, lagStyle };
