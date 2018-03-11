import React from 'react'
import L from 'leaflet'
import Tangram from 'tangram'

class LeafletTangram extends React.Component {
  componentDidMount() {
    const map = L.map(this.mapEl)
    const layer = Tangram.leafletLayer({
      scene: 'https://mapzen.com/carto/bubble-wrap-style/bubble-wrap.yaml',
      attribution:
        '<a href="https://mapzen.com/tangram">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/">Mapzen</a>',
    })
    layer.addTo(map)

    map.setView([40.70531887544228, -74.00976419448853], 15)
  }

  render() {
    return (
      <div
        ref={ref => {
          this.mapEl = ref
        }}
      />
    )
  }
}

export default LeafletTangram
