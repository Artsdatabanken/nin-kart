import React from 'react'
import L from 'leaflet'
//import Tangram from 'tangram'
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
    const options = { zoomControl: false }
    this.map = L.map(this.mapEl, options)
    this.map.on('tangramloaded', e => {
      this.tangramLayer = e.tangramLayer
      this.scene = this.tangramLayer.scene
      this.updateMap(this.props)
    })
    //    this.layer = createLayer(this.props)
    //    this.layer.addTo(this.map)
    this.map.setView(
      [this.props.latitude, this.props.longitude],
      this.props.zoom * 1.1
    )
  }

  componentWillReceiveProps(nextProps) {
    this.updateMap(nextProps)
  }

  updateMap(props) {
    if (this.layer) this.map.removeLayer(this.layer)
    this.layer = createLeafletLayer(props)
    this.map.addLayer(this.layer)
    //    this.layer.addTo(this.map)
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
