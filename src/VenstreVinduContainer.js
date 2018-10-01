import ForsideMeny from './Forsidemeny/Forsidemeny'
import { Snackbar } from '@material-ui/core'
import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import BorreContainer from './Borring/BorreContainer'
import Borrevalg from './Borring/Borrevalg'
import KodeContainer from './Kodetre/Kodeliste/KodeContainer'
import språk from './språk'
import TweakContainer from './Tweaks/TweakContainer'
import Panel from './components/Panel'
import TopBarContainer from './TopBar/TopBarContainer'

// Alt som dukker opp i vinduet på venstre side av skjermen
class VenstreVinduContainer extends React.Component {
  state = { error: '', visForside: true }
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

  handleGoToCode = kode => {
    this.props.history.push('/katalog/' + kode)
  }

  render() {
    const meta = this.props.meta || {}
    const { visForside, onToggleForside } = this.props
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
                      <TopBarContainer tittel={this.tittel(this.props.meta)} />
                      <KodeContainer
                        kode={meta.kode}
                        onGoToCode={this.handleGoToCode}
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
                    <TopBarContainer
                      tittel={
                        'Innstillinger for ' +
                        (match.params.lag || match.params.kode)
                      }
                    />
                    <TweakContainer
                      kode={match.params.kode}
                      lag={match.params.lag}
                      koder={this.props.aktiveLag}
                      {...this.finnValgtKodeElement(match.params.kode)}
                      onFitBounds={this.props.onFitBounds}
                      onUpdateLayerProp={this.props.onUpdateLayerProp}
                      onRemoveSelectedLayer={this.props.onRemoveSelectedLayer}
                      onMouseEnter={this.props.onMouseEnter}
                      onMouseLeave={this.props.onMouseLeave}
                    />
                  </Panel>
                )}
              />
              <Route
                path="/punkt/:lng,:lat/:view?"
                render={({ match, history }) => (
                  <Panel style={{ paddingTop: 0 }}>
                    <TopBarContainer
                      tittel={
                        match.params.lng.substr(0, 8) +
                        ',' +
                        match.params.lat.substr(0, 8)
                      }
                    />
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
                    <TopBarContainer tittel="Klikk i kart" />
                    <Borrevalg />
                  </Panel>
                )}
              />
              <Route
                render={({ match, history }) => (
                  <ForsideMeny
                    onVis={onToggleForside}
                    onSkjul={onToggleForside}
                    visForside={visForside}
                  />
                )}
              />
            </Switch>
            {this.state.error && (
              <Snackbar
                open={true}
                message={'Søk feilet: ' + JSON.stringify(this.state.error)}
                autoHideDuration={4000}
                onRequestClose={this.handleCloseSnackbar}
              />
            )}
          </React.Fragment>
        )}
      />
    )
  }
  handleCloseSnackbar = () => this.setState({ error: null })
}

export default withRouter(VenstreVinduContainer)
