import React from 'react'
import { storiesOf } from '@storybook/react'
import ColorPicker from './ColorPicker'
import { muiTheme } from 'storybook-addon-material-ui'
import { action } from '@storybook/addon-actions/dist/index'

storiesOf('ColorPicker', module)
  .addDecorator(muiTheme())
  .add('default', () => <ColorPicker />)
