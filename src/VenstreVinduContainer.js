import { Paper, Snackbar } from '@material-ui/core'
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
    Object.keys(this.props.valgteKoder).forEach(id => {
      const forelder = this.props.valgteKoder[id]
      if (forelder.kode === kode) item = forelder

      Object.keys(forelder.barn).forEach(barnId => {
        const barn = forelder.barn[barnId]
        if (barn.kode === kode) item = barn
      })
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
              paddingTop: 48,
              bottom: 0,
              width: window.innerWidth < 600 ? window.innerWidth : 408,
              zIndex: -10,
              overflowY: 'scroll',
              overflowX: 'hidden',
            }}
          >
            {this.state.error && (
              <Snackbar
                open={true}
                message={'Søk feilet: ' + JSON.stringify(this.state.error)}
                autoHideDuration={4000}
                onRequestClose={() => this.setState({ error: null })}
              />
            )}
            <TopBar
              onGoBack={() => history.goBack()}
              onExitToRoot={() => {
                this.setState({ searchResults: null })
                history.push('/')
                this.props.onExitToRoot()
              }}
              onToggleMainDrawer={this.props.onToggleMainDrawer}
              isAtRoot={history.location.pathname === '/'}
              query={this.state.query}
              tittel={this.tittel(this.props.meta)}
              parentId={this.state.parentId}
              onQueryChange={this.handleQueryChange}
              minimized={this.state.minimized}
            />
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
                      isActiveLayer={this.props.isActiveLayer}
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
                      style={{ backgroundColor: '#eee' }}
                      koder={this.props.valgteKoder}
                      onMouseEnter={this.props.onMouseEnter}
                      onMouseLeave={this.props.onMouseLeave}
                      onRemoveSelectedLayer={this.props.onRemoveSelectedLayer}
                      visKatalog={this.props.visKatalog}
                    />
                  )
                }}
              />

              <Route
                path="/lag/:kode"
                render={({ match, history }) => (
                  <Tweaks
                    kode={match.params.kode}
                    onRemoveSelectedLayer={this.props.onRemoveSelectedLayer}
                    koder={this.props.valgteKoder}
                    onGoToCode={sti => {
                      this.setState({ searchResults: null })
                      history.push('/katalog/' + sti)
                    }}
                    item={this.finnValgtKodeElement(match.params.kode)}
                    onExitToRoot={() => {
                      this.setState({ searchResults: null })
                      history.push('/')
                      this.props.onExitToRoot()
                    }}
                    onFitBounds={this.props.onFitBounds}
                    updateColor={this.props.updateColor}
                  />
                )}
              />
              <Route
                path="/punkt/:lng,:lat"
                render={({ match, history }) => (
                  <PunktinformasjonContainer
                    lng={match.params.lng}
                    lat={match.params.lat}
                    localId={this.props.localId}
                  />
                )}
              />
            </Switch>
            {this.state.searchResults && (
              <Paper
                style={{
                  position: 'absolute',
                  top: 56,
                  left: 8,
                  zOrder: 1000,
                  backgroundColor: 'red',
                }}
                zDepth={2}
              >
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
              </Paper>
            )}
          </div>
        )}
      />
    )
  }
}

export default withRouter(VenstreVinduContainer)
