import { storiesOf } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { muiTheme } from 'storybook-addon-material-ui'
import Tweaks from './'

const item = {
  farge: '#666',
  kode: 'NA',
  sti: 'na',
  tittel: 'Natursystem',
  vis: true,
  kanSlettes: true,
}

storiesOf('Tweaks', module)
  .addDecorator(muiTheme())
  .add('root', () => (
    <MemoryRouter>
      <div style={{ width: 400 }}>
        <Tweaks kode={'bakgrunnskart'} />
        <Tweaks kode={'terreng'} />
        <Tweaks kode={'NA'} item={item} />
      </div>
    </MemoryRouter>
  ))
