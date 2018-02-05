import React from 'react'
import { storiesOf } from '@storybook/react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter } from 'react-router-dom'
import Resultatliste from './ResultatListe'

const results = [{ kode: 'KA', name: 'Kalk' }]

storiesOf('Resultatliste', module).add('default', () => {
  return (
    <MuiThemeProvider>
      <Resultatliste searchResults={results} />
    </MuiThemeProvider>
  )
})
