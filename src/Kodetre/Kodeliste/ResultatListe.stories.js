import React from 'react'
import { storiesOf } from '@storybook/react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Resultatliste from './ResultatListe'

const results = [{ kode: 'KA', navn: 'Kalk' }]

storiesOf('Resultatliste', module).add('default', () => {
  return (
    <MuiThemeProvider>
      <Resultatliste searchResults={results} query="alk" />
    </MuiThemeProvider>
  )
})
