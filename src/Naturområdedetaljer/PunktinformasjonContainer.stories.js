import React from 'react'
import { storiesOf } from '@storybook/react'
import PunktinformasjonContainer from './PunktinformasjonContainer'
import { muiTheme } from 'storybook-addon-material-ui'

storiesOf('PunktinformasjonContainer', module)
  .addDecorator(muiTheme())
  .add('default', () => <PunktinformasjonContainer />)
