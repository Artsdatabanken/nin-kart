import React from 'react'
import KodeVinduContainer from './Kodetre/Kodeliste/KodeVinduContainer'
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
              <Route
                render={({ match, history }) => (
                  <ResultatListe
                    searchResults={this.state.searchResults}
                    onClick={kode => {
                      this.setState({ searchResults: null })
                      history.push('/katalog/' + kode)
                    }}
                  />
                )}
              />
            ) : (
              <Switch>
                <Route
                  path="/katalog/:kode?"
                  render={({ match, history }) => (
                    <KodeVinduContainer
                      style={{ height: '100vh' }}
                      kode={match.params.kode}
                      filterCode={this.props.filterCode}
                      filter={this.props.filter}
                      onGoToCode={kode => {
                        history.push('/katalog/' + kode)
                        this.setState({ searchResults: null })
                      }}
                      onCheck={this.props.onCheckChange}
                      isSelected={this.props.isSelected}
                      mapbounds={this.props.mapbounds}
                    />
                  )}
                />

                <Route
                  path="/punkt/:lng,:lat,:localId"
                  render={({ match, history }) => (
                    <PunktinformasjonContainer
                      lng={match.params.lng}
                      lat={match.params.lat}
                      localId={match.params.localId}
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
