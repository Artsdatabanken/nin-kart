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

function lagSource(url, bbox, zoom) {
  return {
    filtering: "nearest",
    type: "Raster",
    url4: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    url3: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
    url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    max_zoom: 21
  };
}

export default { drawAll, lagSource };
