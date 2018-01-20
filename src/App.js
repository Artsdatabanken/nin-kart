import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import NatureAreaDetailContainer from './Naturområdedetaljer/NatureAreaDetailContainer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DigDownListContainer from './DigDownList/DigDownListContainer'
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
              <Route
                path="/digdown/:id"
                exact
                component={DigDownListContainer}
              />
              <Route
                path="/details"
                exact
                render={() => (
                  <NatureAreaDetailContainer
                    natureAreaId={'3b06e6f4-402b-4844-87bc-9a7c7a872cb2'}
                  />
                )}
              />
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
