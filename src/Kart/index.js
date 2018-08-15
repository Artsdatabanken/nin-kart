// @flow
//import Mapbox from './Mapbox'
import React from 'react'
import { withRouter } from 'react-router'
import LeafletTangram from './LeafletTangram'

type State = {}

type Props = {
  history: Object,
  onMapBoundsChange: Function,
  mapStyle: String,
  bounds: Array<Number>,
  latitude: Number,
  longitude: Number,
  zoom: Number,
  pitch: Number,
  bearing: Number,
  aktiveLag: Array<string>,
  opplystKode: String,
  meta: Object,
}

class Kart extends React.Component<Props, State> {
  onClick = latlng => {
    this.props.history.push(`/punkt/${latlng.lng},${latlng.lat}`)
  }

  render() {
    return <LeafletTangram {...this.props} onClick={this.onClick} />
  }
}

export default withRouter(Kart)
