import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import FinnKode from './FinnKode'

storiesOf('FinnKode', module)
  .addDecorator(muiTheme())
  .add('default', () => <FinnKode />)
