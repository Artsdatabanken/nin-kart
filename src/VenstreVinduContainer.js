import React from 'react'
import KodeVinduContainer from './Kodetre/Kodeliste/KodeVinduContainer'
import TopBar from './TopBar/TopBar'
import ResultatListe from './Kodetre/Kodeliste/ResultatListe'
import { Route, Switch } from 'react-router-dom'

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
                console.log('exit2root')
                this.setState({ searchResults: null })
                history.push('/')
                console.log('exited2root')
              }}
              onToggleMainDrawer={this.props.onToggleMainDrawer}
              isAtRoot={match.path === '/'}
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
                      console.log('onclick')
                      this.setState({ searchResults: null })
                      history.push('/lag/' + kode)
                      console.log('onclicked')
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
                      kode={match.params.kode}
                      filterCode={this.props.filterCode}
                      filter={this.props.filter}
                      onGoToCode={kode => {
                        history.push('/lag/' + kode)
                        this.setState({ searchResults: null })
                      }}
                      onAddLayer={this.props.onAddLayer}
                      onCheck={this.props.onCheckChange}
                      isSelected={this.props.isSelected}
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
