import React from 'react'
import { Route } from 'react-router-dom'
import KodeVindu from './KodeVindu'
import TopBar from '../../TopBar/TopBar'
import backend from '../../backend'
import ResultatListe from './ResultatListe'
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
class KodelisteContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.fetchData(this.props.kode)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps.kode)
  }

  fetchData(kode) {
    this.setState({ meta: dummyMeta, data: null })
    backend
      .hentKode(kode || '')
      .then(data => rename(data))
      .then(data => this.setState({ data: data }))
    backend.hentKodeMeta(kode).then(data => this.setState({ meta: data }))
  }

  render() {
    const data = this.state.data
    if (!data) return null
    return (
      <Route
        render={({ history }) => (
          <div>
            <TopBar
              onGoBack={this.props.onGoBack}
              onToggleShowKodeListe={this.props.onToggleShowKodeListe}
              onToggleMainDrawer={this.props.onToggleMainDrawer}
              showKodeListe={this.props.showKodeListe}
              title={data.kode}
              parentId={this.state.parentId}
              onSearchResults={items => {
                this.setState({ searchResults: items })
              }}
            />
            {this.state.searchResults ? (
              <ResultatListe
                searchResults={this.state.searchResults}
                onClick={kode => {
                  history.push('/' + kode)
                  this.setState({ searchResults: null })
                }}
              />
            ) : (
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
            )}
          </div>
        )}
      />
    )
  }
}

export default KodelisteContainer
