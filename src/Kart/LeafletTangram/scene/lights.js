const lights = {
  point1: {
    type: 'directional',
    direction: [0, 1, -0.5],
    diffuse: 1,
    ambient: 0.3,
  },
}

function createLights() {
  return lights
}

export { createLights }
