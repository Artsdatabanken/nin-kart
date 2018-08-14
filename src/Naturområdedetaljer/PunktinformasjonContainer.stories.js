import { storiesOf } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { muiTheme } from 'storybook-addon-material-ui'
import PunktinformasjonContainer from './PunktinformasjonContainer'

var props = {
  lng: 13.033673600080975,
  lat: 68.00607535146632,
}

storiesOf('PunktinformasjonContainer', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <MemoryRouter>
      <PunktinformasjonContainer {...props} />
    </MemoryRouter>
  ))
