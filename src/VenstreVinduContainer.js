import { Divider, Snackbar } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import AktiveKartlag from './AktiveKartlag'
import backend from './backend'
import BorreContainer from './Borring/BorreContainer'
import KodeContainer from './Kodetre/Kodeliste/KodeContainer'
import ResultatListe from './Kodetre/Kodeliste/ResultatListe'
import SpesifiktObjekt from './SpesifiktObjekt'
import språk from './språk'
import TopBar from './TopBar/TopBar'
import TweakContainer from './Tweaks/TweakContainer'

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
    if (!q) return

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

  render() {
    return (
      <Route
        render={({ match, history }) => (
          <div
            style={{
              backgroundColor: '#f5f5f5',
              position: 'fixed',
              top: 0,
              left: 0,
              padding: 0,
              bottom: 0,
              width: 408,
              zIndex: -10,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
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
            <div style={{ height: 70 }} />
            <Switch>
              <Route
                path="/katalog/:kode*"
                render={({ match, history }) => {
                  return (
                    <KodeContainer
                      path={match.params.kode || ''}
                      onGoToCode={url => {
                        this.setState({ searchResults: null })
                        console.log(url)
                        history.push('/katalog/' + url)
                      }}
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
                  )
                }}
              />
              <Route
                exact
                path="/"
                render={({ match, history }) => {
                  return (
                    <AktiveKartlag
                      koder={this.props.aktiveLag}
                      onMouseEnter={this.props.onMouseEnter}
                      onMouseLeave={this.props.onMouseLeave}
                      onUpdateLayerProp={this.props.onUpdateLayerProp}
                      onRemoveSelectedLayer={this.props.onRemoveSelectedLayer}
                    />
                  )
                }}
              />

              <Route
                path="/lag/:kode/:lag?"
                render={({ match, history }) => (
                  <TweakContainer
                    kode={match.params.kode}
                    lag={match.params.lag}
                    koder={this.props.aktiveLag}
                    {...this.finnValgtKodeElement(match.params.kode)}
                    onFitBounds={this.props.onFitBounds}
                    onUpdateLayerProp={this.props.onUpdateLayerProp}
                    onRemoveSelectedLayer={this.props.onRemoveSelectedLayer}
                  />
                )}
              />
              <Route
                path="/punkt/:lng,:lat"
                render={({ match, history }) => (
                  <BorreContainer
                    lng={match.params.lng}
                    lat={match.params.lat}
                  />
                )}
              />
              <Route
                path="/detaljer/:prefiks/:geom_id"
                render={({ match, history }) => (
                  <SpesifiktObjekt
                    prefiks={match.params.prefiks}
                    geom_id={match.params.geom_id}
                  />
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
          </div>
        )}
      />
    )
  }
}

export default withRouter(VenstreVinduContainer)
