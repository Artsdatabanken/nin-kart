import typesystem from '@artsdatabanken/typesystem'
import { List, ListSubheader } from '@material-ui/core'
import React, { Component } from 'react'
import backend from '../backend'
import Borring from './Borring'
import Mockup from './Mockup'

class BorreContainer extends Component {
  state = {}

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.lng !== this.props.lng || this.props.lat !== prevProps.lat)
      this.fetch(this.props.lng, this.props.lat, this.props.localId)
  }

  componentDidMount() {
    this.fetch(this.props.lng, this.props.lat)
  }

  //TODO: Fjern denne når APIet leverer på nytt format
  mapPunktHack(data, sted) {
    if (!data) return
    data = this.hackInnSted(sted, data)
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
      if (node.ids && node.ids.length > 0) s.geom_id = node.ids[0]
    })
    return r
  }

  hackInnSted(sted, data) {
    if (!sted) return data
    const r = {}
    Object.keys(data).forEach(key => {
      let node = data[key]
      while (node.barn) node = node.barn[0]
      if (key.substring(0, 2) === 'AO') {
        if (sted.placename) {
          console.log(r[key])
          r[key] = {
            key: node.value + ', ' + node.key,
            value: sted.placename + this.formatElevation(sted.elevation),
          }
          console.log(r[key])
        }
      } else r[key] = node
    })
    return r
  }

  formatElevation(elevation) {
    if (elevation < 0) return ' (' + -elevation + ' muh)'
    return ' (' + elevation + ' moh)'
  }

  fetch(lng, lat) {
    this.setState({
      borrehull: null,
      sted: null,
    })
    backend.hentPunkt(lng, lat).then(data => {
      this.data = data
      this.setState({
        borrehull: this.mapPunktHack(this.data, this.sted),
      })
    })

    backend.hentStedsnavn(lng, lat).then(data => {
      this.sted = data
      this.setState({
        borrehull: this.mapPunktHack(this.data, this.sted),
      })
    })
  }

  render() {
    if (!this.props.lat) return null
    return (
      <List>
        <ListSubheader>
          Punktet {parseFloat(this.props.lat).toFixed(4)}° N{' '}
          {parseFloat(this.props.lng).toFixed(4)}° Ø
        </ListSubheader>
        {false && <Mockup />}
        {this.state.borrehull && <Borring barn={this.state.borrehull.barn} />}
      </List>
    )
  }
}

export default BorreContainer
