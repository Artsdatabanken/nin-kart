import React from 'react'
import { storiesOf } from '@storybook/react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Resultatliste from './ResultatListe'

const results = [{ kode: 'KA', tittel: { nb: 'Kalk' } }]

storiesOf('Resultatliste', module).add('default', () => {
  return (
    <MuiThemeProvider>
      <Resultatliste searchResults={results} />
    </MuiThemeProvider>
  )
})
