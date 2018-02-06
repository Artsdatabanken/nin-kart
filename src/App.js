import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import Grunnkart from './Grunnkart/Grunnkart'
import 'mapbox-gl/dist/mapbox-gl.css'
import './App.css'

const muiTheme = getMuiTheme({
  palette: {
    textColor: '#5f5f5f',
    primary1Color: '#927b64', //'#7da2a1',//'#f46c22',
    accent2Color: '#666', //'#7da2a1',//'#9c9c9c',
    accent1Color: '#927b64', //'#c07541',
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
  drawer: { width: 320 },
})

console.log(muiTheme)

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <Grunnkart />
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
