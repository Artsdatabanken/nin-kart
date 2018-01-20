import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Kode from './Kodetre/Kode'
import Kart from './Kart/Kart'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
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
