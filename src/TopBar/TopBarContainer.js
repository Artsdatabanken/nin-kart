import React, { Component } from 'react'
import { Divider } from '@material-ui/core'
import { Route, withRouter } from 'react-router-dom'
import backend from '../backend'
import ResultatListe from '../Kodetre/Kodeliste/ResultatListe'
import TopBar from './TopBar'

type State = {
  searchResults: Array<Object>,
  query: string,
  focused: boolean,
  onFocus: Function,
  onBlur: Function,
  onQueryChange: Function,
}

type Props = {
  tittel: string,
}

class TopBarContainer extends Component<Props, State> {
  queryNumber = 0
  state = { query: '', focused: false }

  componentWillUpdate(prevProps) {
    if (this.props.tittel !== prevProps.tittel && this.state.query)
      this.setState({ query: '' })
  }
  handleFocus = e => {
    this.setState({ focused: true })
    if (!this.props.query) this.handleQueryChange(e, this.props.tittel)
  }

  handleBlur = e => {
    this.setState({ focused: false, searchResults: null })
  }

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
    const { query, focused } = this.state
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
              query={focused ? query : query || tittel || ''}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
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
