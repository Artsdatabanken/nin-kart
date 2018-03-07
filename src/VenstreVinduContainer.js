import React from 'react'
import KodeContainer from './Kodetre/Kodeliste/KodeContainer'
import TopBar from './TopBar/TopBar'
import ResultatListe from './Kodetre/Kodeliste/ResultatListe'
import { Route, Switch } from 'react-router-dom'
import PunktinformasjonContainer from './Naturområdedetaljer/PunktinformasjonContainer'
import backend from './backend'
import rename from './rename'
import { Snackbar } from 'material-ui'

// Alt som dukker opp i vinduet på venstre side av skjermen
class VenstreVinduContainer extends React.Component {
  state = { query: '' }
  queryNumber = 0

  handleQueryChange = (e, q) => {
    this.queryNumber++
    this.setState({
      query: q,
      searchResults: null,
      error: null,
    })
    const currentQuery = this.queryNumber
    backend.søkKode(q).then(items => {
      items = rename(items)
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

  tittel(meta) {
    if (!meta) return null
    if (!meta.overordnet) return null
    if (meta.tittel.nb) return meta.tittel.nb
    return meta.tittel.la
  }

  render() {
    return (
      <Route
        render={({ match, history }) => (
          <div>
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
              }}
              onToggleMainDrawer={this.props.onToggleMainDrawer}
              isAtRoot={history.location.pathname === '/'}
              query={this.state.query}
              tittel={this.tittel(this.props.meta)}
              parentId={this.state.parentId}
              onQueryChange={this.handleQueryChange}
            />
            {this.state.searchResults ? (
              <ResultatListe
                query={this.state.query}
                searchResults={this.state.searchResults}
                onClick={kode => {
                  const segments = kode.match(/[a-zA-Z]+|[0-9]+/g) || []
                  const path = segments.join('/')
                  history.push('/katalog/' + path)
                  this.setState({ query: '', searchResults: null })
                }}
              />
            ) : (
              <Switch>
                <Route
                  path="/katalog/:kode*"
                  render={({ match, history }) => {
                    return (
                      <KodeContainer
                        style={{ height: '100vh' }}
                        path={match.params.kode ? match.params.kode : ''}
                        kode={
                          match.params.kode
                            ? match.params.kode
                                .replace('/', '_')
                                .replace(/\//g, '-')
                            : match.params.kode
                        }
                        onGoToCode={kode => {
                          const segments = kode.match(/[a-zA-Z]+|[0-9]+/g) || []
                          const path = segments.join('/')
                          history.push('/katalog/' + path)
                          this.setState({ searchResults: null })
                        }}
                        onMouseEnter={this.props.onMouseEnter}
                        onMouseLeave={this.props.onMouseLeave}
                        mapbounds={this.props.mapbounds}
                        language={this.props.language}
                        meta={this.props.meta}
                        handleUpdateLayerProp={this.props.handleUpdateLayerProp}
                      />
                    )
                  }}
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
            )}
          </div>
        )}
      />
    )
  }
}

export default VenstreVinduContainer
