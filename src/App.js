import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Grunnkart from './Grunnkart/Grunnkart'
import { SettingsContext } from './SettingsContext'

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
})

class App extends Component {
  state = { visKoder: false }
  componentDidMount() {
    this.setState({ visKoder: localStorage.getItem('visKoder') === 'true' })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <SettingsContext.Provider
            value={{
              visKoder: this.state.visKoder,
              updateValue: (key, value) => {
                this.setState({ [key]: value })
                localStorage.setItem(key, value)
              },
            }}
          >
            <Grunnkart />
          </SettingsContext.Provider>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
