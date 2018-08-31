import typesystem from '@artsdatabanken/typesystem'
import { List, ListSubheader } from '@material-ui/core'
import React, { Component } from 'react'
import backend from '../backend'
import Borring from './Borring'
import Kommune from './Kommune'
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
  mapPunktHack(data) {
    let r = {}
    Object.keys(data).forEach(kode => {
      const node = data[kode]
      const nivå = typesystem.splittKode(kode)
      let s = r
      let prev = r
      nivå.forEach(n => {
        if (!s.barn) s.barn = {}
        s.barn[n] = {}
        prev = s
        s = s.barn[n]
      })
      s.kode = kode
      prev.tittel = node.key
      s.tittel = node.value
    })

    console.log(JSON.stringify(r))
    return r
  }

  fetch(lng, lat) {
    this.setState({
      borrehull: null,
      sted: null,
    })
    backend.hentPunkt(lng, lat).then(data => {
      this.setState({
        borrehull: this.mapPunktHack(data),
      })
    })

    backend.hentStedsnavn(lng, lat).then(data => {
      this.setState({
        sted: data,
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
        {this.state.kommune && (
          <Kommune {...this.state.kommune} {...this.state.sted} />
        )}
        {false && <Mockup />}
        {this.state.borrehull && <Borring innhold={this.state.borrehull} />}
      </List>
    )
  }
}

export default BorreContainer
// http://test.artsdatabanken.no/data/json/ninMetadata/5DBB745C-9E51-4450-A66F-5F8F4033464D.json
