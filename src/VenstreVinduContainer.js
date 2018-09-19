import { Divider, Snackbar } from '@material-ui/core'
import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import backend from './backend'
import BorreContainer from './Borring/BorreContainer'
import Borrevalg from './Borring/Borrevalg'
import KodeContainer from './Kodetre/Kodeliste/KodeContainer'
import ResultatListe from './Kodetre/Kodeliste/ResultatListe'
import språk from './språk'
import TopBar from './TopBar/TopBar'
import TweakContainer from './Tweaks/TweakContainer'
import Panel from './components/Panel'

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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.meta !== this.props.meta) this.setState({ query: null })
  }

  tittel(meta, currentItem) {
    if (meta && meta.tittel) {
      return språk(meta.tittel)
    }
    return null
  }

  finnValgtKodeElement(kode) {
    var item = undefined
    Object.keys(this.props.aktiveLag).forEach(id => {
      const forelder = this.props.aktiveLag[id]
      if (forelder.kode === kode) item = forelder
    })

    return item
  }

  handleGotoCode = kode => {
    this.setState({ searchResults: null })
    this.props.history.push('/katalog/' + kode)
  }

  render() {
    const meta = this.props.meta || {}
    return (
      <Route
        render={({ match, history }) => (
          <React.Fragment>
            <Switch>
              <Route
                path="/katalog/:kode*"
                render={({ match, history }) => {
                  return (
                    <Panel style={{ paddingTop: 0 }}>
                      <KodeContainer
                        kode={meta.kode}
                        onGoToCode={this.handleGotoCode}
                        onMouseEnter={this.props.onMouseEnter}
                        onMouseLeave={this.props.onMouseLeave}
                        onFitBounds={this.props.onFitBounds}
                        erAktivert={this.props.erAktivert}
                        opplystKode={this.props.opplystKode}
                        onToggleLayer={this.props.onToggleLayer}
                        mapBounds={this.props.mapBounds}
                        language={this.props.language}
                        meta={this.props.meta}
                      />
                    </Panel>
                  )
                }}
              />

              <Route
                path="/lag/:kode/:lag?"
                render={({ match, history }) => (
                  <Panel>
                    <TweakContainer
                      kode={match.params.kode}
                      lag={match.params.lag}
                      koder={this.props.aktiveLag}
                      {...this.finnValgtKodeElement(match.params.kode)}
                      onFitBounds={this.props.onFitBounds}
                      onUpdateLayerProp={this.props.onUpdateLayerProp}
                      onRemoveSelectedLayer={this.props.onRemoveSelectedLayer}
                    />
                  </Panel>
                )}
              />
              <Route
                path="/punkt/:lng,:lat/:view?"
                render={({ match, history }) => (
                  <Panel style={{ paddingTop: 0 }}>
                    <BorreContainer
                      lng={match.params.lng}
                      lat={match.params.lat}
                      view={match.params.view}
                    />
                  </Panel>
                )}
              />
              <Route
                path="/punkt/valg"
                render={({ match, history }) => (
                  <Panel style={{ paddingTop: 0 }}>
                    <Borrevalg />
                  </Panel>
                )}
              />
            </Switch>
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
              isAtRoot={history.location.pathname === '/'} // HACK
              query={this.state.query}
              tittel={this.tittel(this.props.meta)}
              onQueryChange={this.handleQueryChange}
            >
              {this.state.searchResults && (
                <React.Fragment>
                  <Divider />
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
                </React.Fragment>
              )}
            </TopBar>
          </React.Fragment>
        )}
      />
    )
  }
}

export default withRouter(VenstreVinduContainer)
