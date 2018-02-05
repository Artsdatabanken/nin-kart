import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import { action } from '@storybook/addon-actions/dist/index'
import Kontrollpanel from './Kontrollpanel'

var categories = ['Kalk']
var color = { Kalk: '#ff0' }
var visibility = { Kalk: true }
storiesOf('Kontrollpanel', module)
  .addDecorator(muiTheme())
  .add('testlag', () => (
    <div style={{ width: 480 }}>
      <Kontrollpanel
        visibility={visibility}
        categories={categories}
        color={color}
      />
    </div>
  ))
