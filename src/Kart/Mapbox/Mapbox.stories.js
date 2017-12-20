import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import { Paper } from 'material-ui'

import Mapbox from './Mapbox'

storiesOf('Kart Mapbox', module)
  .addDecorator(muiTheme())
  .add("default", () => {
    return (
      <div style={{ padding: '40px', width: '350px' }}>
        <Paper zDepth={3}>
            <Mapbox />
        </Paper>
      </div>
    )
  })
