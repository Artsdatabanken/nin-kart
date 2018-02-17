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

  queryNumber = 0

  componentDidMount() {
    this.fetchData(this.props.kode)
  }

  componentWillUnmount() {
    this.queryNumber = 0
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.kode !== nextProps.kode ||
      this.props.mapbounds !== nextProps.mapbounds
    )
      this.fetchData(nextProps.kode)
  }

  fetchData(kode) {
    this.queryNumber++
    const currentQuery = this.queryNumber
    backend
      .hentKode(kode || 'ROT', this.props.mapbounds)
      .then(data => rename(data))
      .then(data => {
        if (currentQuery !== this.queryNumber) return // Abort stale query
        this.setState({ data: data })
      })
    backend.hentKodeMeta(kode).then(data => {
      if (currentQuery !== this.queryNumber) return // Abort stale query
      this.setState({ meta: data })
    })
  }

  render() {
    const data = this.state.data
    if (!data) return null
    return (
      <KodeVindu
        data={data}
        meta={this.state.meta || {}}
        onGoToCode={this.props.onGoToCode}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      />
    )
  }
}

export default KodeContainer
