function drawAll({ kartformat }) {
  return {
    google: {
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
    type: "Raster",
    url: url,
    max_zoom: zoom[1]
  };
}

export default { drawAll, lagSource };
