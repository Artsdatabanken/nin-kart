import React from 'react'
import KodeContainer from './Kodetre/Kodeliste/KodeContainer'
import TopBar from './TopBar/TopBar'
import ResultatListe from './Kodetre/Kodeliste/ResultatListe'
import { Route, Switch } from 'react-router-dom'
import PunktinformasjonContainer from './Naturområdedetaljer/PunktinformasjonContainer'

// Alt som dukker opp i vinduet på venstre side av skjermen
class VenstreVinduContainer extends React.Component {
  state = {}

  render() {
    return (
      <Route
        render={({ match, history }) => (
          <div>
            <TopBar
              onGoBack={() => history.goBack()}
              onExitToRoot={() => {
                this.setState({ searchResults: null })
                history.push('/')
              }}
              onToggleMainDrawer={this.props.onToggleMainDrawer}
              isAtRoot={history.location.pathname === '/'}
              title={'data.kode'}
              parentId={this.state.parentId}
              onSearchResults={items => {
                this.setState({
                  searchResults: items,
                })
              }}
            />
            {this.state.searchResults ? (
              <ResultatListe
                searchResults={this.state.searchResults}
                onClick={kode => {
                  const segments = kode.match(/[a-zA-Z]+|[0-9]+/g) || []
                  const path = segments.join('/')
                  history.push('/katalog/' + path)
                  this.setState({ searchResults: null })
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
