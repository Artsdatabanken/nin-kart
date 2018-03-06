import React from 'react'
import KodeVindu from './KodeVindu'
import backend from '../../backend'
import rename from '../../rename'

// Informasjon om kode
class KodeContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  dataQueryNumber = 0

  componentWillUnmount() {
    this.queryNumber = 0
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.meta && this.props.mapbounds !== nextProps.mapbounds) {
      this.fetchData(nextProps.meta.kode)
    }
  }

  fetchData(kode) {
    this.dataQueryNumber++
    const currentQuery = this.dataQueryNumber
    backend
      .hentKode(kode, this.props.mapbounds)
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
    return (
      <KodeVindu
        data={data}
        meta={meta || {}}
        onUpdateLayerProp={this.props.handleUpdateLayerProp}
        onGoToCode={this.props.onGoToCode}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        language={this.props.language}
      />
    )
  }
}

export default KodeContainer
