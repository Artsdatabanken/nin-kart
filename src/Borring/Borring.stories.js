import { storiesOf } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { muiTheme } from 'storybook-addon-material-ui'
import Borring from './Borring'

var props = {
  LA: { tittel: 'Landskap', barn: { LA_ID: { tittel: 'Innlandsdal' } } },
  MI: {
    tittel: 'Miljøvariabel',
    barn: {
      MI_KA: {
        tittel: 'Kalkinnhold',
        'MI_KA-B': {
          barn: { tittel: 'temmelig kalkfattig' },
        },
      },
    },
  },
  NA: {
    tittel: 'Natursystem',
    barn: {
      NA_T: {
        tittel: 'Fastmark',
        barn: { NA_T44: { tittel: 'Åker' } },
      },
    },
  },
}

storiesOf('Borring', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <MemoryRouter>
      <Borring innhold={props} />
    </MemoryRouter>
  ))
