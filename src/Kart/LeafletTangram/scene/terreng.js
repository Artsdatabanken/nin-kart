// @flow
import terrengmal from './mal/terreng'

function lagTerreng(lag, config) {
  config.layers.terreng = terrengmal
  config.sources.normals = {
    type: 'Raster',
    url:
      'https://tile.nextzen.org/tilezen/terrain/v1/256/normal/{z}/{x}/{y}.png?api_key=Tqy6UAn9ShClyvfUon001g',
    max_zoom: 15,
  }
  console.log(config)
}

export { lagTerreng }
