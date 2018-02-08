import React from 'react'
import KodeVinduContainer from './Kodetre/Kodeliste/KodeVinduContainer'
import TopBar from './TopBar/TopBar'
import ResultatListe from './Kodetre/Kodeliste/ResultatListe'
import { Route, Switch } from 'react-router-dom'
import Kontrollpanel from './Kart/Mapbox/Kontrollpanel'
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
                      history.push('/lag/' + kode)
                    }}
                  />
                )}
              />
            ) : (
              <Switch>
                <Route
                  path="/lag/:kode?"
                  render={({ match, history }) => (
                    <KodeVinduContainer
                      style={{ height: '100vh' }}
                      kode={match.params.kode}
                      filterCode={this.props.filterCode}
                      filter={this.props.filter}
                      onGoToCode={kode => {
                        history.push('/lag/' + kode)
                        this.setState({ searchResults: null })
                      }}
                      onCheck={this.props.onCheckChange}
                      isSelected={this.props.isSelected}
                    />
                  )}
                />
                <Route
                  path="/kontrollpanel"
                  render={({ match, history }) => (
                    <Kontrollpanel
                      onVisibilityChange={this.props.onVisibilityChange}
                      onColorChange={this.props.onColorChange}
                      categories={this.props.categories}
                      visibility={this.props.visibility}
                      color={this.props.color}
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
