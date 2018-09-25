var highlighted = {}

function opplysKode(layer, kode, parent) {
  if (!layer.scene.config) return 1

  parent = kode === '' ? '_kat' : parent + '_kat'

  if (
    highlighted.parent &&
    highlighted.parent !== parent &&
    parent !== '_kat'
  ) {
    highlighted = {}
    return true
  }

  if (layer.scene.config && !layer.scene.config.layers.hasOwnProperty(parent)) {
    if (!highlighted.draw) return true

    layer.scene.config.layers[highlighted.parent][highlighted.kode].draw =
      highlighted.draw
  } else {
    if (highlighted.draw && highlighted.kode !== kode) {
      layer.scene.config.layers[highlighted.parent][highlighted.kode].draw =
        highlighted.draw
    }
    if (kode !== '')
      highlighted = {
        draw: layer.scene.config.layers[parent][kode].draw,
        kode: kode,
        parent: parent,
      }

    layer.scene.config.layers[parent][kode].draw = drawHighlight
  }
  layer.scene.updateConfig({ rebuild: true })
  return false
}

let drawHighlight = {
  lines: {
    color: '#ff0000',
    order: 100,
    width: '2.0px',
  },
  mu_polygons: {
    color: '#ff0000',
    order: 100,
  },
}

export { opplysKode }
