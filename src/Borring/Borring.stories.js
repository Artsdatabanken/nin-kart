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

var børgefjell = {
  barn: {
    BS: {
      barn: {
        '6': {
          barn: {
            SO: {
              barn: { '5': { kode: 'BS_6SO-5', tittel: 'Lavalpin sone (la)' } },
              tittel: 'Bioklimatiske soner',
            },
          },
        },
      },
    },
    VV: {
      barn: { '261': { kode: 'VV_261', tittel: 'Børgefjell/Byrkije' } },
      tittel: 'Naturvernområde',
    },
    AO: {
      barn: {
        '18': {
          barn: { '26': { kode: 'AO_18-26', tittel: 'Hattfjelldal' } },
          tittel: 'Nordland',
        },
      },
    },
    MI: {
      barn: {
        KA: {
          barn: { B: { kode: 'MI_KA-B', tittel: 'Temmelig kalkfattig' } },
          tittel: 'Kalkinnhold',
        },
      },
    },
  },
}

storiesOf('Borring', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <MemoryRouter>
      <div style={{ width: 408 }}>
        <Borring innhold={børgefjell} />
      </div>
    </MemoryRouter>
  ))
