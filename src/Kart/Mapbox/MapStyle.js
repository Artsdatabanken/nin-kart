import { fromJS } from 'immutable'
import MAP_STYLE from './default.json'
import MAP_STYLE_DARK from './dark.json'
import MAP_STYLE_VINTAGE from './vintage.json'
import MAP_STYLE_LIGHT from './light'
import MAP_STYLE_SATELLITE from './satellite.json'

export const NiN = fromJS({
  id: 'nin',
  type: 'fill',
  source: 'sqrt42',
  'source-layer': 'sqrt42',
  interactive: true,
  paint: {
    'fill-color': 'hsla(120, 22%, 24%, 0.1)',
    'fill-outline-color': 'hsla(146, 26%, 49%, 0.1)',
  },
})
export const NiNHover = fromJS({
  id: 'nin-hover',
  type: 'fill',
  source: 'sqrt42',
  'source-layer': 'sqrt42',
  filter: ['==', 'localId', ''],
  paint: {
    'fill-color': 'cyan',
    'fill-outline-color': 'hsla(0, 22%, 22%, 0.52)',
  },
})

export const defaultMapStyle = fromJS(MAP_STYLE)
export const darkMapStyle = fromJS(MAP_STYLE_DARK)
export const vintageMapStyle = fromJS(MAP_STYLE_VINTAGE)
export const lightMapStyle = fromJS(MAP_STYLE_LIGHT)
export const satelliteStyle = fromJS(MAP_STYLE_SATELLITE)
