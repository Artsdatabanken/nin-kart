import { storiesOf } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { muiTheme } from 'storybook-addon-material-ui'
import Tweaks from './'

const item = {
  farge: '#666',
  koder: [{ kode: 'NA' }],
  sti: 'na',
  tittel: 'Natursystem',
  erSynlig: true,
  kanSlettes: true,
}

storiesOf('Tweaks', module)
  .addDecorator(muiTheme())
  .add('NA', () => (
    <MemoryRouter>
      <div style={{ width: 400 }}>
        <Tweaks kode={'NA'} {...item} />
      </div>
    </MemoryRouter>
  ))
  .add('bakgrunn', () => (
    <MemoryRouter>
      <div style={{ width: 400 }}>
        <Tweaks kode={'bakgrunnskart'} />
        <Tweaks kode={'terreng'} />
      </div>
    </MemoryRouter>
  ))
  .add('terreng', () => (
    <MemoryRouter>
      <div style={{ width: 400 }}>
        <Tweaks kode={'terreng'} />
      </div>
    </MemoryRouter>
  ))
