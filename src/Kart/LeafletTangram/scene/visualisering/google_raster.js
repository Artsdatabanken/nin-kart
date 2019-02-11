function drawAll(drawArgs) {
  return {
    googld: {
      draw: {
        raster: {
          color: [1.0, 1.0, 1.0, 1.0],
          order: 0
        }
      },
      data: { source: "bakgrunnskart" }
    }
  };
}

function lagSource(url, bbox, zoom) {
  return {
    filtering: "nearest",
    type: "Raster",
    url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    max_zoom: 14
  };
}

export default { drawAll, lagSource };
