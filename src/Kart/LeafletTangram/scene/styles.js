//import { createColorTexture } from '../../../ramp'

const styles = {
  textures: {
    gradient: {
      url: 'http://localhost:3000/xxxgradient.png',
      filtering: 'nearest',
    },
  },
  gradient: {
    base: 'raster',
    shaders: {
      uniforms: {
        gradient: '/BS_6SE.png',
        //gradient: createColorTexture(document.createElement('canvas')),
        min: 0.1,
        max: 1.0,
      },
      blocks: {
        color:
          'float v = sampleRaster(0).r; float x = step(min,v);float y=(1.-step(max,v));color = texture2D(gradient, vec2(x*y*v, 0.5));',
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
