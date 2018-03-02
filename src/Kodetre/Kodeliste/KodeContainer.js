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
    this.fetchMeta(this.props.kode)
  }

  componentWillUnmount() {
    this.queryNumber = 0
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.kode !== nextProps.kode) {
      this.fetchMeta(nextProps.kode)
    } else if (this.props.mapbounds !== nextProps.mapbounds)
      this.fetchData(this.state.meta.kode)
  }

  static tempCounter = 0
  static tempColors = [
    '#d53e4f',
    '#f46d43',
    '#fdae61',
    '#fee08b',
    '#e6f598',
    '#abdda4',
    '#66c2a5',
    '#3288bd',
  ]

  fetchMeta(kode) {
    this.metaQueryNumber++
    const currentQuery = this.metaQueryNumber
    backend.hentKodeMeta(kode).then(data => {
      if (currentQuery !== this.metaQueryNumber) return // Abort stale query
      if (data && data.barn)
        Object.keys(data.barn).forEach(key => {
          //console.log(key)
          let v = data.barn[key]
          if (!v.farge) {
            const i =
              KodeContainer.tempCounter++ % KodeContainer.tempColors.length
            //console.log(i)
            v.farge = KodeContainer.tempColors[i]
          }
        })
      //console.log(data)
      this.setState({ meta: data ? data : '' })
      if (data) this.fetchData(data.kode)
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
        language={this.props.language}
      />
    )
  }
}

export default KodeContainer
