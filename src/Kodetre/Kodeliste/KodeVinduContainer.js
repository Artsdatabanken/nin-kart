import React from 'react'
import KodeVindu from './KodeVindu'
import backend from '../../backend'
import rename from '../../rename'

const dummyMeta = {
  forelder: {
    kode: 'Kode forelder',
    tittel: 'Tittel forelder',
    avatar: 'https://www.artsdatabanken.no/Media/F16592?mode=480x480',
  },
  selv: {
    kode: 'Kode',
    tittel: 'Tittel',
    media: 'https://artsdatabanken.no/Media/F4763?mode=512x512',
  },
  barn: {},
  relasjon: [],
}

// Informasjon om kode
class KodeVinduContainer extends React.Component {
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
    this.fetchData(nextProps.kode)
  }

  fetchData(kode) {
    this.queryNumber++
    this.setState({ meta: dummyMeta, data: null })
    const currentQuery = this.queryNumber
    backend
      .hentKode(kode || '', this.props.mapbounds)
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
        filterCode={this.props.filterCode}
        filter={this.props.filter}
        onGoToCode={this.props.onGoToCode}
        onAddLayer={this.props.onAddLayer}
        onCheck={this.props.onCheckChange}
        isSelected={this.props.isSelected}
      />
    )
  }
}

export default KodeVinduContainer
