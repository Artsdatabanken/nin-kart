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
  metaQueryNumber = 0

  componentDidMount() {
    this.fetchData(this.props.kode)
    this.fetchMeta(this.props.kode)
  }

  componentWillUnmount() {
    this.queryNumber = 0
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.kode !== nextProps.kode) {
      this.fetchMeta(nextProps.kode)
      this.fetchData(nextProps.kode)
    } else if (this.props.mapbounds !== nextProps.mapbounds)
      this.fetchData(nextProps.kode)
  }

  fetchMeta(kode) {
    this.metaQueryNumber++
    const currentQuery = this.metaQueryNumber
    backend.hentKodeMeta(kode).then(data => {
      if (currentQuery !== this.metaQueryNumber) return // Abort stale query
      this.setState({ meta: data })
    })
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

  handleUpdateLayerProp = (kode, key, value) => {
    let meta = this.state.meta
    let layer = meta.barn[kode]
    layer[key] = value
    this.setState({ meta: meta })
  }

  render() {
    const data = this.state.data
    const meta = this.state.meta
    if (!meta) return null
    return (
      <KodeVindu
        data={data}
        meta={this.state.meta || {}}
        onUpdateLayerProp={this.handleUpdateLayerProp}
        onGoToCode={this.props.onGoToCode}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      />
    )
  }
}

export default KodeContainer
