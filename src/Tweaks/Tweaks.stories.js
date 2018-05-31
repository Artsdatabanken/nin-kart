import { storiesOf } from '@storybook/react'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import Tweaks from './'

const item = {
  farge: '#666',
  kode: 'NA',
  sti: 'na',
  tittel: 'Natursystem',
  vis: true,
  barn: ['ja'],
  removable: true,
}

storiesOf('Tweaks', module)
  .addDecorator(muiTheme())
  .add('root', () => (
    <div style={{ width: 400 }}>
      <Tweaks kode={'terreng'} />
      <Tweaks kode={'NA'} item={item} />
    </div>
  ))
