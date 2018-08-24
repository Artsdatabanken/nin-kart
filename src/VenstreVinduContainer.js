import { Snackbar } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import AktiveKartlag from './AktiveKartlag'
import backend from './backend'
import KodeContainer from './Kodetre/Kodeliste/KodeContainer'
import ResultatListe from './Kodetre/Kodeliste/ResultatListe'
import PunktinformasjonContainer from './Naturområdedetaljer/PunktinformasjonContainer'
import språk from './språk'
import TopBar from './TopBar/TopBar'
import Tweaks from './Tweaks'

// Alt som dukker opp i vinduet på venstre side av skjermen
class VenstreVinduContainer extends React.Component {
  state = { query: '' }
  queryNumber = 0

  handleQueryChange = e => {
    const q = e.target.value
    this.setState({
      query: q,
      error: null,
      searchResults: null,
    })
    if (!q) return

    this.queryNumber++
    this.setState({
      query: q,
      error: null,
    })
    this.props.history.replace('/')
    const currentQuery = this.queryNumber
    backend.søkKode(q).then(items => {
      if (currentQuery !== this.queryNumber) return // Abort stale query
      if (items.error) {
        this.setState({ error: items.error })
      } else {
        this.setState({
          searchResults: items,
        })
      }
    })
  }

  tittel(meta, currentItem) {
    if (meta && meta.tittel) {
      return språk(meta.tittel)
    }
    return null
  }

  finnValgtKodeElement(kode) {
    var item = undefined
    Object.keys(this.props.aktiveLag).forEach(id => {
      const forelder = this.props.aktiveLag[id]
      if (forelder.kode === kode) item = forelder
    })

    return item
  }

  render() {
    return (
      <Route
        render={({ match, history }) => (
          <div
            style={{
              backgroundColor: '#f5f5f5',
              position: 'fixed',
              top: 0,
              left: 0,
              padding: 0,
              bottom: 0,
              width: window.innerWidth < 600 ? window.innerWidth : 408,
              zIndex: -10,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            <TopBar
              onGoBack={() => history.goBack()}
              onExitToRoot={() => {
                this.setState({ searchResults: null })
                history.push('/')
              }}
              onToggleMainDrawer={this.props.onToggleMainDrawer}
              isAtRoot={history.location.pathname === '/'}
              query={this.state.query}
              tittel={this.tittel(this.props.meta)}
              onQueryChange={this.handleQueryChange}
            >
              {this.state.searchResults && (
                <ResultatListe
                  query={this.state.query}
                  searchResults={this.state.searchResults}
                  language={this.props.language}
                  onClick={url => {
                    console.warn('url', url)
                    this.setState({ query: '', searchResults: null })
                    history.push('/katalog/' + url)
                  }}
                />
              )}
            </TopBar>
            <Switch>
              <Route
                path="/katalog/:kode*"
                render={({ match, history }) => {
                  return (
                    <KodeContainer
                      path={match.params.kode || ''}
                      onGoToCode={url => {
                        this.setState({ searchResults: null })
                        console.log(url)
                        history.push('/katalog/' + url)
                      }}
                      onMouseEnter={this.props.onMouseEnter}
                      onMouseLeave={this.props.onMouseLeave}
                      onFitBounds={this.props.onFitBounds}
                      erAktivert={this.props.erAktivert}
                      opplystKode={this.props.opplystKode}
                      onToggleLayer={this.props.onToggleLayer}
                      mapBounds={this.props.mapBounds}
                      language={this.props.language}
                      meta={this.props.meta}
                    />
                  )
                }}
              />
              <Route
                exact
                path="/"
                render={({ match, history }) => {
                  return (
                    <AktiveKartlag
                      style={{
                        paddingTop: 72,
                      }}
                      koder={this.props.aktiveLag}
                      onMouseEnter={this.props.onMouseEnter}
                      onMouseLeave={this.props.onMouseLeave}
                      onUpdateLayerProp={this.props.onUpdateLayerProp}
                      onRemoveSelectedLayer={this.props.onRemoveSelectedLayer}
                    />
                  )
                }}
              />

              <Route
                path="/lag/:kode"
                render={({ match, history }) => (
                  <Tweaks
                    style={{
                      marginTop: 72,
                    }}
                    kode={match.params.kode}
                    koder={this.props.aktiveLag}
                    {...this.finnValgtKodeElement(match.params.kode)}
                    onFitBounds={this.props.onFitBounds}
                    onUpdateLayerProp={this.props.onUpdateLayerProp}
                    onRemoveSelectedLayer={this.props.onRemoveSelectedLayer}
                  />
                )}
              />
              <Route
                path="/punkt/:lng,:lat"
                render={({ match, history }) => (
                  <PunktinformasjonContainer
                    lng={match.params.lng}
                    lat={match.params.lat}
                  />
                )}
              />
            </Switch>
            {this.state.error && (
              <Snackbar
                open={true}
                message={'Søk feilet: ' + JSON.stringify(this.state.error)}
                autoHideDuration={4000}
                onRequestClose={() => this.setState({ error: null })}
              />
            )}
          </div>
        )}
      />
    )
  }
}

export default withRouter(VenstreVinduContainer)
