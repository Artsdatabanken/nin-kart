import React from 'react'
import { storiesOf } from '@storybook/react'
import KodeContainer from './KodeContainer'
import { muiTheme } from 'storybook-addon-material-ui'
import { action } from '@storybook/addon-actions/dist/index'

storiesOf('KodeContainer', module)
  .addDecorator(muiTheme())
  .add('default', () => <KodeContainer />)
