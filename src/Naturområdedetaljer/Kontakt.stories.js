import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import { Paper } from 'material-ui'

import Kontakt from './Kontakt'

storiesOf('Kontakt', module)
  .addDecorator(muiTheme())
  .add("Ole i'Dole", () => {
    return (
      <div style={{ padding: '40px', width: '350px' }}>
        <Paper zDepth={3}>
          <Kontakt />
        </Paper>
      </div>
    )
  })
