import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'

import Naturområdedetaljer from './Naturområdedetaljer'

const kartlegging = {
  bestiller: {
    firma: 'Evenrude',
    kontaktperson: "Ole i'Dole",
    telefon: '+47 99 55 11 45',
    epost: 'ole@idole.com'
  }
}

storiesOf('Naturområdedetaljer', module)
  .addDecorator(muiTheme())
  .add('naturområdedetaljer', () => {
    return <Naturområdedetaljer kartlegging={kartlegging} />
  })
