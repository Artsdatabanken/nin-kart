import React from 'react'
import { Route } from 'react-router-dom'
import KodeVindu from './Kodetre/Kodeliste/KodeVindu'
import TopBar from './TopBar/TopBar'
import backend from './backend'
import ResultatListe from './Kodetre/Kodeliste/ResultatListe'
import rename from './rename'

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

// Alt som dukker opp i vinduet på venstre side av skjermen
class VenstreVinduContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { mode: 'none' }
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
    console.log(this.state.mode)
    if (!data) return null
    return (
      <Route
        render={({ history }) => (
          <div>
            <TopBar
              onGoBack={this.props.onGoBack}
              onExitToRoot={() => this.setState({ mode: 'none' })}
              onToggleMainDrawer={this.props.onToggleMainDrawer}
              isAtRoot={this.state.mode === 'none'}
              title={data.kode}
              parentId={this.state.parentId}
              onSearchResults={items => {
                console.log(items)
                this.setState({
                  mode: items ? 'results' : 'none',
                  searchResults: items,
                })
              }}
            />
            {this.state.mode === 'results' && (
              <ResultatListe
                searchResults={this.state.searchResults}
                onClick={kode => {
                  history.push('/' + kode)
                  this.setState({
                    mode: 'kode',
                    searchResults: null,
                  })
                }}
              />
            )}
            {this.state.mode === 'kode' && (
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

export default VenstreVinduContainer
