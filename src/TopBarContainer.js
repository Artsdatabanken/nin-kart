import React, { Component } from 'react'
import { Divider } from '@material-ui/core'
import { Route, withRouter } from 'react-router-dom'
import backend from './backend'
import ResultatListe from './Kodetre/Kodeliste/ResultatListe'
import TopBar from './TopBar/TopBar'

class TopBarContainer extends Component {
  state = {}
  queryNumber = 0

  handleQueryChange = e => {
    const q = e.target.value
    this.setState({
      query: q,
      error: null,
      searchResults: null,
    })

    this.queryNumber++
    const currentQuery = this.queryNumber
    if (!q) return

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

  render() {
    const { tittel } = this.props
    return (
      <Route
        render={({ match, history }) => (
          <React.Fragment>
            <TopBar
              onGoBack={() => history.goBack()}
              onExitToRoot={() => {
                this.setState({ searchResults: null })
                history.push('/')
              }}
              isAtRoot={history.location.pathname === '/'}
              query={
                this.state.query // HACK
              }
              tittel={tittel}
              onQueryChange={this.handleQueryChange}
            >
              {this.state.searchResults && (
                <React.Fragment>
                  <Divider />
                  <ResultatListe
                    query={this.state.query}
                    searchResults={this.state.searchResults}
                    onClick={url => {
                      console.warn('url', url)
                      this.setState({ query: '', searchResults: null })
                      history.push('/katalog/' + url)
                    }}
                  />
                </React.Fragment>
              )}
            </TopBar>
          </React.Fragment>
        )}
      />
    )
  }
}

export default withRouter(TopBarContainer)
