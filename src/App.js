import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import Kode from './Kodetre/Kode'
import Kart from './Kart/Kart'
import 'mapbox-gl/dist/mapbox-gl.css'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#63AD82',
    accent1Color: '#D43C00',
  },
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={muiTheme}>
          <BrowserRouter>
            <Switch>
              <Route
                path="/"
                exact
                render={() => <Kart latitude={63} longitude={10} zoom={4} />}
              />
              <Route path="/kode/:kode" exact component={Kode} />
              {false && <Route component={RedirectToDefault} />}{' '}
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    )
  }
}

const RedirectToDefault = () => <Redirect from="/" to="/map" />

export default App
