import { storiesOf } from '@storybook/react'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import PunktinformasjonContainer from './PunktinformasjonContainer'

var props = {
  lng: 13.033673600080975,
  lat: 68.00607535146632,
  localId: '791e011f-6afc-4079-93ef-b3634001bd54',
}

storiesOf('PunktinformasjonContainer', module)
  .addDecorator(muiTheme())
  .add('default', () => <PunktinformasjonContainer {...props} />)
