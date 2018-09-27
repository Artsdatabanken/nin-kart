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
  inlineResultat: boolean,
}

class TopBarContainer extends Component<Props, State> {
  queryNumber = 0
  state = { query: '', focused: false }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.tittel !== nextProps.tittel) return true
    if (this.props.children !== nextProps.children) return true
    if (this.state.query !== nextState.query) return true
    if (this.state.searchResults !== nextState.searchResults) return true
    if (this.state.focused !== nextState.focused) return true
    return false
  }

  componentDidUpdate(prevProps) {
    if (this.props.tittel !== prevProps.tittel && this.state.query)
      this.setState({ query: '' })
  }

  handleFocus = e => {
    this.setState({ focused: true })
    if (!this.props.query) this.handleQueryChange(e, this.props.tittel)
    if (this.props.onFocus) this.props.onFocus()
  }

  handleBlur = e => {
    this.setState({ focused: false })
    if (this.props.removeResultsOnBlur) this.setState({ searchResults: null })
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

  handleGoBack = () => this.props.history.goBack()
  handleExitToRoot = () => {
    this.setState({ searchResults: null })
    this.props.history.push('/')
  }

  handleClickSearchResult = url => {
    console.warn('url', url)
    this.setState({ query: '', searchResults: null })
    this.props.history.push('/katalog/' + url)
  }

  render() {
    const { tittel } = this.props
    const { query, focused } = this.state
    return (
      <Route
        render={({ match, history }) => (
          <React.Fragment>
            <TopBar
              onGoBack={this.handleGoBack}
              onExitToRoot={this.handleExitToRoot}
              isAtRoot={history.location.pathname === '/'}
              query={focused ? query : query || tittel || ''}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              tittel={tittel}
              onQueryChange={this.handleQueryChange}
            />
            <div style={{ width: 408, paddingTop: 57 }}>
              {this.state.searchResults && (
                <div style={{ marginLeft: 8, marginRight: 8 }}>
                  <Divider />
                  <ResultatListe
                    query={this.state.query}
                    searchResults={this.state.searchResults}
                    onClick={this.handleClickSearchResult}
                  />
                </div>
              )}
              {this.props.children}
            </div>
          </React.Fragment>
        )}
      />
    )
  }
}

export default withRouter(TopBarContainer)
