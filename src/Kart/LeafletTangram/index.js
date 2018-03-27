import React from 'react'
import L from 'leaflet'
//import Tangram from 'tangram'
import { createLeafletLayer, makeScene } from './scene'
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
      keyboard: true,
    }
    this.map = L.map(this.mapEl, options)
    this.layer = createLeafletLayer(this.props)
    this.layer.on('init', function() {
      if (true)
        this.scene
          .queryFeatures({
            //            filter: { $layer: 'transit', kind: 'subway' },
            group_by: 'BS_6SE',
          })
          .then(results => {
            console.log(Object.keys(results))
          })
      this.layer.scene.updateConfig()
      //      this.layer.scene.rebuildGeometry()
    })
    this.map.addLayer(this.layer)
    this.map.setView(
      [this.props.latitude, this.props.longitude],
      this.props.zoom * 1.8
    )
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.meta === nextProps.meta) return
    this.updateMap(nextProps)
  }

  updateMap(props) {
    //    if (this.layer) this.map.removeLayer(this.layer)
    const la = createLeafletLayer(props)
    console.log('la', la)

    if (this.layer.scene.initialized) {
      if (this.layer) this.map.removeLayer(this.layer)
      this.map.addLayer(la)
      this.layer = la
    }
    return
    //    this.layer.scene = makeScene(props)
    console.log('initialized', this.layer.scene.initialized)
    this.layer.scene.config_source.layers = la.scene.config_source.layers
    this.layer.scene = la.scene
    //    this.layer.scene.config = la.scene.config
    console.log('updateConfig', la.scene.config)
    //    if (this.layer.scene.initialized) this.layer.scene.rebuild()
    if (this.layer.scene.initialized) {
      console.warn('updateConfig!!!!!')
      // this.layer.scene.rebuild()
      //      this.layer.scene.updateConfig()
    }
  }

  componentWillUpdate() {}

  render() {
    if (this.layer) console.log('initialized', this.layer.scene.initialized)
    if (this.layer) console.log('render', this.layer.scene)
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
