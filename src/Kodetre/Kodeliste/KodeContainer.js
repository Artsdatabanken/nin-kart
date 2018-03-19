// @flow
import React from 'react'
import KodeVindu from './KodeVindu'
import backend from '../../backend'
import rename from '../../rename'

type State = {
  data: Object,
}

type Props = {
  meta: Object,
  mapbounds: Object,
  language: string,
  onFitBounds: Function,
  onMouseLeave: Function,
  onMouseEnter: Function,
  onGoToCode: Function,
  handleUpdateLayerProp: Function,
}

// Informasjon om kode
class KodeContainer extends React.Component<Props, State> {
  dataQueryNumber = 0
  state = { data: {} }

  componentWillReceiveProps(nextProps: Object) {
    let oldKode =
      this.props.meta && this.props.meta.kode ? this.props.meta.kode : ''
    let oldBounds = this.props.mapbounds ? this.props.mapbounds : ''
    let newKode =
      nextProps.meta && nextProps.meta.kode ? nextProps.meta.kode : ''
    let newBounds = nextProps.mapbounds ? nextProps.mapbounds : ''
    if (oldKode !== newKode || oldBounds !== newBounds) {
      this.fetchData(newKode, newBounds)
    }
  }

  fetchData(kode: string, bounds: Object) {
    this.dataQueryNumber++
    const currentQuery = this.dataQueryNumber
    backend
      .hentKode(kode, bounds)
      .then(data => rename(data))
      .then(data => {
        if (currentQuery !== this.dataQueryNumber) return // Abort stale query
        this.setState({ data: data })
      })
  }

  render() {
    const data = this.state.data
    const meta = this.props.meta
    if (!meta) return null
    if (!meta.tittel) return null
    return (
      <KodeVindu
        data={data}
        meta={meta || {}}
        onUpdateLayerProp={this.props.handleUpdateLayerProp}
        onGoToCode={this.props.onGoToCode}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onFitBounds={this.props.onFitBounds}
        language={this.props.language}
      />
    )
  }
}

export default KodeContainer
