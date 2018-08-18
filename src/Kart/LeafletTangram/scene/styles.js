const styles = {
  normals: {
    base: 'polygons',
    raster: 'normal',
  },
  elevation: {
    base: 'polygons',
    raster: 'custom',
    shaders: {
      blocks: {
        global: `
                    float unpack(vec4 h) {
                        return (h.r * 1. + h.g / 256. + h.b / 65536.);
                    }`,
        color: `
//                    color.rgb = vec3(sampleRaster(0).r);
                    color.rgb = vec3(0.4,0.4,1.);
                    color.a = vec3(sampleRaster(0)).r;
                    `,
      },
    },
  },
  boundary: {
    base: 'lines',
    order: 150,
    blend: 'overlay',
    dash: [2, 0.5],
  },
  mu_polygons: {
    base: 'polygons',
    blend: 'multiply',
  },
  mu_lines: {
    base: 'lines',
    blend: 'multiply',
  },
}

function createStyles() {
  return styles
}

export { createStyles }
