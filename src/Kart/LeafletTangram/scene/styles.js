const styles = {
  gradient: {
    //    base: 'polygons',
    //    raster: 'custom',
    shaders: {
      blocks: {
        color: 'color = sampleRaster(0);',
        //        "normal": "normal = normalize(sampleRaster(1).xyz * 2. - 1.); // normal from second raster (normal tiles)"
      },
    },
  },
  po: {
    base: 'points',
    texture: '/marker.png',
  },
  boundary: {
    base: 'lines',
    order: 150,
    blend: 'overlay',
  },
  mu_polygons: {
    base: 'polygons',
    blend: 'multiply',
  },
  mu_lines: {
    base: 'lines',
    blend: 'multiply',
  },
  road_names: {
    base: 'text',
    draw: {
      font: {
        family: 'Roboto',
        size: '12px',
        fill: 'black',
        stroke: {
          color: 'white',
          width: '1px',
        },
      },
    },
  },
}

function createStyles() {
  return styles
}

export { createStyles }
