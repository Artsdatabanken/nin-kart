<<<<<<< HEAD
import React from 'react'
import L from 'leaflet'
import { createLeafletLayer } from './scene'

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
    const options = {
      zoomControl: false,
      inertia: true,
      minZoom: 4,
    }
    let map = L.map(this.mapEl, options)
    map.on('dragstart', function(e) {
      if (e.hard) {
        // moved by bounds
        console.log('start move by bounds', e)
      } else {
        // moved by drag/keyboard
        console.log('start move by user', e)
      }
    })
    map.on('dragend', e => {
      if (e.hard) {
        // moved by bounds
        console.log('end  move by bounds', e)
      } else {
        // moved by drag/keyboard
        this.removeMarker()
        this.props.onMapBoundsChange(map.getBounds())
      }
    })
    map.on('zoomend', e => {
      if (e.hard) {
        // moved by bounds
        console.log('end  move by bounds', e)
      } else {
        // moved by drag/keyboard
        this.props.onMapBoundsChange(map.getBounds())
      }
    })
    map.setView(
      [this.props.latitude, this.props.longitude],
      this.props.zoom * 1.8
    )

    L.control.zoom({ position: 'bottomright' }).addTo(map)
    L.DomUtil.addClass(map._container, 'crosshair-cursor-enabled')
    this.map = map
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.meta === nextProps.meta) return
    this.updateMap(nextProps)
  }

  removeMarker() {
    if (!this.marker) return
    this.map.removeLayer(this.marker)
  }

  onClick = e => {
    const latlng = e.leaflet_event.latlng
    this.removeMarker()
    this.marker = L.marker([latlng.lat, latlng.lng])
    this.map.addLayer(this.marker)
    this.props.onClick(latlng)
  }
  updateMap(props) {
    if (this.layer) this.map.removeLayer(this.layer)
    this.layer = createLeafletLayer(props, this.onClick)
    this.map.addLayer(this.layer)
  }

  render() {
    return (
      <div
        style={{ zIndex: 0, cursor: 'default' }}
        ref={ref => {
          this.mapEl = ref
        }}
      />
    )
  }
}

export default LeafletTangram
||||||| merged common ancestors
=======
import React from 'react'
import L from 'leaflet'
//import Tangram from 'tangram'
import Tangram from 'tangram/dist/tangram.debug'

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
          mapzen: {
            url:
              'https://{s}.tile.nextzen.org/tilezen/vector/v1/512/all/{z}/{x}/{y}.mvt',
            url_subdomains: ['a', 'b', 'c', 'd'],
            url_params: {
              api_key: 'Tqy6UAn9ShClyvfUon001g',
            },
            tile_size: 512,
            max_zoom: 16,
          },
        },
        layers: {
          '6SO': {
            data: {
              source: 'og',
              layer: 'Seksjoner2017_4326-c6e9g5',
            },
            '6SE-1': {
              filter: {
                '6SE': 1,
              },
              draw: {
                _transparent: {
                  order: 100,
                  color: [62 / 255.0, 65 / 255.0, 254 / 255.0, 0.8],
                },
              },
            },
            '6SE-2': {
              filter: {
                '6SE': 2,
              },
              draw: {
                _transparent: {
                  order: 100,
                  color: [98 / 255.0, 129 / 255.0, 254 / 255.0, 0.8],
                },
              },
            },
            '6SE-3': {
              filter: {
                '6SE': 3,
              },
              draw: {
                _transparent: {
                  order: 100,
                  color: [133 / 255.0, 183 / 255.0, 254 / 255.0, 0.8],
                },
              },
            },
            '6SE-4': {
              filter: {
                '6SE': 4,
              },
              draw: {
                _transparent: {
                  order: 100,
                  color: [165 / 255.0, 218 / 255.0, 255 / 255.0, 0.9],
                },
              },
            },
            '6SE-5': {
              filter: {
                '6SE': 5,
              },
              draw: {
                _transparent: {
                  order: 100,
                  color: [202 / 255.0, 245 / 255.0, 254 / 255.0, 0.9],
                },
              },
            },
          },
          naturomrader6: {
            data: {
              source: 'og',
              layer: 'naturomrader6',
            },
            draw: {
              _transparent: {
                width: '1px',
                color: [0.9, 0.0, 0.0, 1.0],
              },
            },
          },
        },
        styles: {
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
>>>>>>> Import Tangram
