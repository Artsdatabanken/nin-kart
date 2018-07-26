// @flow
//import Mapbox from './Mapbox'
import React from 'react'
import { withRouter } from 'react-router'
import Tangram from './LeafletTangram'

type State = {}

type Props = {
  history: Object,
  onMapBoundsChange: Function,
  mapStyle: String,
  latitude: Number,
  longitude: Number,
  zoom: Number,
  pitch: Number,
  bearing: Number,
  aktivKode: String,
  aktiveLag: Array<string>,
  opplystKode: String,
  meta: Object,
}

class Kart extends React.Component<Props, State> {
  onClick = latlng => {
    this.props.history.push(`/punkt/${latlng.lng},${latlng.lat}`)
  }

  render() {
    return <Tangram {...this.props} onClick={this.onClick} />
  }
}

export default withRouter(Kart)
