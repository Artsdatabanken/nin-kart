// @flow
import React from 'react'
import backend from '../../backend'
import KodeVindu from './KodeVindu'

type State = {
  data: Object,
}

type Props = {
  meta: Object,
  mapBounds: Object,
  onFitBounds: Function,
  onMouseLeave: Function,
  onMouseEnter: Function,
  onGoToCode: Function,
  onToggleLayer: Function,
}

// Informasjon om kode
class KodeContainer extends React.Component<Props, State> {
  dataQueryNumber = 0
  state = { data: {} }

  componentWillReceiveProps(nextProps: Object) {
    let oldKode =
      this.props.meta && this.props.meta.kode ? this.props.meta.kode : ''
    let oldBounds = this.props.mapBounds ? this.props.mapBounds : ''
    let newKode =
      nextProps.meta && nextProps.meta.kode ? nextProps.meta.kode : ''
    let newBounds = nextProps.mapBounds ? nextProps.mapBounds : ''
    if (oldKode !== newKode || oldBounds !== newBounds) {
      this.fetchData(newKode, newBounds)
    }
  }

  fetchData(kode: string, bounds: Object) {
    this.dataQueryNumber++
    const currentQuery = this.dataQueryNumber
    backend.hentKode(kode, bounds).then(data => {
      if (!data) data = {}
      if (currentQuery !== this.dataQueryNumber) return // Abort stale query
      let størsteAreal = 0
      if (data.barn)
        data.barn.forEach(b => {
          if (størsteAreal < b.areal) størsteAreal = b.areal
        })
      data.størsteAreal = størsteAreal
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
        onGoToCode={this.props.onGoToCode}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onFitBounds={this.props.onFitBounds}
        isActiveLayer={this.props.isActiveLayer}
        onToggleLayer={this.props.onToggleLayer}
      />
    )
  }
}

export default KodeContainer
