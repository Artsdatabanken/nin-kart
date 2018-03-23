import React from 'react'
import L from 'leaflet'
//import Tangram from 'tangram'
import Tangram from 'tangram/dist/tangram.debug'
import seksjoner from './6SE'

// -- WEBPACK: Load styles --
import 'leaflet/dist/leaflet.css'
import './styles.css'

// -- LEAFLET: Fix Leaflet's icon paths for Webpack --
// See here: https://github.com/PaulLeCam/react-leaflet/issues/255
// Used in conjunction with url-loader.
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

class LeafletTangram extends React.Component {
  componentDidMount() {
    const options = { zoomControl: false }
    const map = L.map(this.mapEl, options)
    var layer = Tangram.leafletLayer({
      scene: {
        import: [
          //          'https://firebasestorage.googleapis.com/v0/b/grunnkart.appspot.com/o/mapstyle%2Fzinc-style.zip?alt=media&.zip', //'https://www.nextzen.org/carto/cinnabar-style/9/cinnabar-style.zip',
          //          'https://www.nextzen.org/carto/walkabout-style/7/walkabout-style.zip',
          //          'https://www.nextzen.org/carto/tron-style/6/tron-style.zip',
          'https://www.nextzen.org/carto/refill-style/11/refill-style.zip',
          //'https://www.nextzen.org/carto/bubble-wrap-style/8/bubble-wrap-style.zip',
          'https://www.nextzen.org/carto/bubble-wrap-style/8/themes/label-10.zip',
        ],
        sources: {
          og: {
            type: 'MVT',
            url:
              'https://a.tiles.mapbox.com/v4/artsdatabanken.bthj0gsg,artsdatabanken.9fqc3l9i,artsdatabanken.7hhxtxe3,artsdatabanken.dz9161rw,artsdatabanken.0n0rw38p,artsdatabanken.0183w0w7,artsdatabanken.0hbp7082,artsdatabanken.7676pvsx,artsdatabanken.6j8o5925,artsdatabanken.6rbfhi3x,artsdatabanken.d1s080yu,artsdatabanken.2v0t4l8r/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoiYXJ0c2RhdGFiYW5rZW4iLCJhIjoiY2pjNjg2MzVzMHhycjJ3bnM5MHc4MHVzOCJ9.fLnCRyg-hCuTClyim1r-JQ',
            max_zoom: 16,
          },

          'terrain-normals': {
            type: 'Raster',
            url2:
              'https://tile.nextzen.com/nextzen/terrain/v1/normal/{z}/{x}/{y}.png',
            url3:
              'https://tile.nextzen.org/tilezen/terrain/v1/256/normal/{z}/{x}/{y}.png?api_key=Tqy6UAn9ShClyvfUon001g',
            url: 'http://localhost:8081/dummymap/',
          },
          mapzen: {
            url:
              'https://{s}.tile.nextzen.org/tilezen/vector/v1/512/all/{z}/{x}/{y}.mvt',
            url_subdomains: ['a', 'b', 'c', 'd'],
            url_params: {
              api_key: 'Tqy6UAn9ShClyvfUon001g',
            },
            tile_size: 512,
            max_zoom: 16,
            rasters: ['terrain-normals'],
          },
        },
        lights: {
          point1: {
            type: 'directional',
            direction: [0, 1, -0.5],
            diffuse: 1,
            ambient: 0.3,
          },
        },
        layers: {
          earth: {
            data: { source: 'mapzen' },
            draw: {
              elevation: {
                order: 44440,
              },
            },
          },
        },
        styles: {
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
                    color.rgb = 1.0-vec3(sampleRaster(0).r);
                    color.rgb = (color.rgb - .5)*12. ;
                    color.a = 0.1;
                    `,
              },
            },
          },
          _transparent: {
            base: 'polygons',
            blend: 'multiply',
          },
          _dashes2: {
            base: 'polygons',
            //            dash: [1, 1],
            //            dash_background_color: 'pink',
          },
          naturomrader6: {
            base: 'polygons',
            //            mix: 'filter-grain',
          },
        },
      },

      attribution:
        '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | <a href="http://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a> | <a href="https://www.nextzen.com/" target="_blank">Nextzen</a>',
    })
    layer.addTo(map)

    map.setView(
      [this.props.latitude, this.props.longitude],
      this.props.zoom * 1.1
    )
  }

  render() {
    return (
      <div
        style={{ zIndex: 0 }}
        ref={ref => {
          this.mapEl = ref
        }}
      />
    )
  }
}

export default LeafletTangram
