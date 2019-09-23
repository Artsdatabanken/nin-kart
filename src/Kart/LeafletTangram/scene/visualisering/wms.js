import sysconfig from "Funksjoner/config";

function drawAll(drawArgs) {
  const layer = {
    [drawArgs.kode]: {
      data: { source: drawArgs.kode },
      draw: {
        ["ruter_" + drawArgs.kode]: {
          order: 700
        }
      }
    }
  };
  return layer;
}

function lagStyle(format, drawArgs) {
  const gradient = {
    base: "raster",
    blend: "multiply"
  };
  return {
    name: "wms_" + drawArgs.kode,
    value: gradient
  };
}

function lagSource({ url, zoom }, drawArgs) {
  if (drawArgs.opplystBarn)
    url = url.replace(drawArgs.url, drawArgs.opplystBarn.url);
  return sysconfig.createTileSource(url, "Raster", zoom, drawArgs.bbox);
}

export default { drawAll, lagSource, lagStyle };
