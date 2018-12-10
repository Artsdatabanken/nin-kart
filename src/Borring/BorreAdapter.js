import React, { Component } from 'react'
import BorreVindu from './BorreVindu'

class BorreAdapter extends Component {
  hackInnSted(sted, data) {
    if (!sted) return data
    if (!data) return data
    let ao = data.AO
    if (!ao) return
    ao.sted = sted.placename
    ao.elevasjon = sted.elevation
    return data
  }

  render() {
    const { data, sted, lat, lng, view } = this.props
    if (!lat) return null
    const borrehull = this.hackInnSted(sted, data)
    return <BorreVindu lat={lat} lng={lng} view={view} barn={borrehull} />
  }
}

export default BorreAdapter
