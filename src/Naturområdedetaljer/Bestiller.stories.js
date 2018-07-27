import { Paper } from '@material-ui/core'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import Bestiller from './Bestiller'

const bestiller = {
  firma: 'Evenrude',
  kontaktperson: "Ole i'Dole",
  telefon: '+47 99 55 11 45',
  epost: 'ole@idole.com',
}

storiesOf('Bestiller', module)
  .addDecorator(muiTheme())
  .add("Ole i'Dole", () => {
    return (
      <div style={{ padding: '40px', width: '350px' }}>
        <Paper zDepth={3}>
          <Bestiller {...bestiller} />
        </Paper>
      </div>
    )
  })
