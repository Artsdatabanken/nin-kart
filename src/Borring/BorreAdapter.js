import React, { Component } from 'react'
import BorreVindu from './BorreVindu'

class BorreAdapter extends Component {
  hackInnSted(sted, data) {
    if (!sted) return data
    if (!data) return data
    data.AO = data.AO || {}
    let ao = data.AO
    ao.sted = sted.placename
    ao.elevasjon = sted.elevation
    return data
  }

  render() {
    const { data, sted, lat, lng, view } = this.props
    const borrehull = this.hackInnSted(sted, data)
    return <BorreVindu lat={lat} lng={lng} view={view} barn={borrehull} />
  }
}

export default BorreAdapter
