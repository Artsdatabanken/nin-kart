function drawAll(drawArgs) {
  const { kartformat } = drawArgs;
  return {
    googld: {
      draw: {
        raster: {
          color: kartformat.tint,
          order: 0
        }
      },
      data: { source: "bakgrunnskart" }
    }
  };
}

function lagSource({ url, zoom }, bbox) {
  return {
    xfiltering: "nearest",
    type: "Raster",
    url: url,
    max_zoom: zoom[1]
  };
}

export default { drawAll, lagSource };
