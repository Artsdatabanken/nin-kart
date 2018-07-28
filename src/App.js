import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Grunnkart from './Grunnkart/Grunnkart'

const theme = createMuiTheme({
  palette: {
    textColor: '#5f5f5f',
    disabledColor: '#9a9a9a',
    primary1Color: '#927b64', //'#7da2a1',//'#f46c22',
    accent1Color: '#927b64', //'#c07541',
    canvasColor: '#eeeeee',
  },
  appBar: { height: 48 },
  drawer: { width: 320 },
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Grunnkart />
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
