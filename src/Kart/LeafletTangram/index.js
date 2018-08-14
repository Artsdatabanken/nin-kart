import L from 'leaflet'
// -- WEBPACK: Load styles --
import 'leaflet/dist/leaflet.css'
import React from 'react'
import { createLeafletLayer } from './scene'
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.bounds !== prevProps.bounds) {
      const b = this.props.bounds
      if (b) {
        const c = [[b[1], b[0]], [b[3], b[2]]]
        this.map.flyToBounds(c)
      }
    }
    if (this.props.meta === prevProps.meta) return
    this.updateMap(this.props)
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
        style={{ zIndex: -100, cursor: 'default' }}
        ref={ref => {
          this.mapEl = ref
        }}
      />
    )
  }
}

export default LeafletTangram
