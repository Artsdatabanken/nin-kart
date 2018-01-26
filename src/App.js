import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import Grunnkart from './Grunnkart/Grunnkart'
import 'mapbox-gl/dist/mapbox-gl.css'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#ffffff',
    alternateTextColor: '#222222',
    //    primary1Color: '#c9862a',
    accent1Color: '#4d4b4a',
    action: { active: 'rgba(255,255,255,0.87)' },
  },
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={muiTheme}>
          <BrowserRouter>
            <Switch>
              <Route path="/:kode?" exact component={Grunnkart} />
              {false && <Route component={RedirectToDefault} />}
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    )
  }
}

const RedirectToDefault = () => <Redirect from="/" to="/ROT" />

export default App
