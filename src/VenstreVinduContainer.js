import { Paper, Snackbar } from 'material-ui'
import React from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import AktiveKartlag from './AktiveKartlag'
import KodeContainer from './Kodetre/Kodeliste/KodeContainer'
import ResultatListe from './Kodetre/Kodeliste/ResultatListe'
import PunktinformasjonContainer from './Naturområdedetaljer/PunktinformasjonContainer'
import TopBar from './TopBar/TopBar'
import backend from './backend'

// Alt som dukker opp i vinduet på venstre side av skjermen
class VenstreVinduContainer extends React.Component {
  state = { query: '' }
  queryNumber = 0

  handleQueryChange = (e, q) => {
    if (!q) {
      this.setState({
        query: q,
        error: null,
        searchResults: null,
      })
      return
    }
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
                this.props.onExitToRoot()
              }}
              onToggleMainDrawer={this.props.onToggleMainDrawer}
              isAtRoot={history.location.pathname === '/'}
              query={this.state.query}
              tittel={this.tittel(this.props.meta)}
              parentId={this.state.parentId}
              onQueryChange={this.handleQueryChange}
            />
            {this.state.searchResults && (
              <Paper style={{ position: 'absolute' }} zDepth={2}>
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
            {!this.state.searchResults && (
              <Switch>
                <Route
                  path="/katalog/:kode*"
                  render={({ match, history }) => {
                    return (
                      <KodeContainer
                        style={{ height: '100vh' }}
                        path={match.params.kode ? match.params.kode : ''}
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
                  path="/"
                  render={({ match, history }) => {
                    return (
                      <AktiveKartlag
                        style={{ backgroundColor: '#fff' }}
                        title="Aktiverte lag"
                        koder={this.props.valgteKoder}
                        onMouseEnter={this.props.onMouseEnter}
                        onMouseLeave={this.props.onMouseLeave}
                        onToggleVisible={this.props.onToggleVisible}
                        onUpdateLayerProp={this.props.onUpdateLayerProp}
                        onRemoveSelectedLayer={this.props.onRemoveSelectedLayer}
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

export default withRouter(VenstreVinduContainer)
