import { storiesOf } from '@storybook/react'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import Tweaks from './'
storiesOf('Tweaks', module)
  .addDecorator(muiTheme())
  .add('root', () => (
    <div style={{ width: 400 }}>
      <Tweaks />
    </div>
  ))
