import { storiesOf } from '@storybook/react'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import Innstilling from './Innstilling'

storiesOf('Innstilling', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <Innstilling title="Eye distance">children</Innstilling>
  ))
