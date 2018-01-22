import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import KodeSøk from './KodeSøk'

storiesOf('Kodesøk', module)
  .addDecorator(muiTheme())
  .add('default', () => <KodeSøk />)
