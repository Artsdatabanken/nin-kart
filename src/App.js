import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import Grunnkart from './Grunnkart/Grunnkart'
import 'mapbox-gl/dist/mapbox-gl.css'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#f46c22',
    accent1Color: '#9c9c9c',
    accent2Color: '#c07541',
    /*    alternateTextColor: '#999',
    primary1Color: '#ffffff',
    primary2Color: '#9f9',
    primary3Color: '#99f',
//    primary3Color: '#c9862a',
    accent1Color: '#9c9c9c',
    action: { active: 'rgba(255,255,255,0.87)' },
  */
  },
  appBar: { height: 48 },
})

console.log(muiTheme)
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
