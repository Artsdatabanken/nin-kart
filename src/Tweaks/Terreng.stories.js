import { storiesOf } from '@storybook/react'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import Terreng from './Terreng'
storiesOf('Terreng', module)
  .addDecorator(muiTheme())
  .add('root', () => (
    <div style={{ width: 400 }}>
      <Terreng />
    </div>
  ))
