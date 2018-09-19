import typesystem from '@artsdatabanken/typesystem'
import React, { Component } from 'react'
import BorreVindu from './BorreVindu'

class BorreAdapter extends Component {
  //TODO: Fjern denne når APIet leverer på nytt format
  mapPunktHack(data, sted) {
    if (!data) return
    let r = {}
    Object.keys(data).forEach(kode => {
      const node = data[kode]
      const nivå = typesystem.splittKode(kode)
      let s = r
      let prev = r
      nivå.forEach(n => {
        if (!s.barn) s.barn = {}
        if (!s.barn[n]) s.barn[n] = {}
        prev = s
        s = s.barn[n]
      })
      s.kode = kode
      prev.tittel = node.key
      s.tittel = node.value
      if (node.fraction) s.andel = node.fraction
      if (node.id) s.geom_id = node.id
    })
    r = this.hackInnSted(sted, r)
    return r
  }

  hackInnSted(sted, data) {
    if (!sted) return data
    if (!data.barn) return data
    let ao = data.barn.AO
    if (!ao) return
    ao.sted = sted.placename
    ao.elevasjon = sted.elevation
    return data
  }

  render() {
    const { data, sted, lat, lng } = this.props
    if (!lat) return null
    const borrehull = this.mapPunktHack(data, sted)
    const barn = borrehull && borrehull.barn
    return <BorreVindu lat={lat} lng={lng} barn={barn} />
  }
}
//{false && <Mockup />}
//{false && borrehull && <Borring barn={borrehull.barn} />}

export default BorreAdapter
