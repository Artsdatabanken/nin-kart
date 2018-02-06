import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import { MemoryRouter } from 'react-router-dom'
import VenstreVinduContainer from './VenstreVinduContainer'

storiesOf('VenstreVindu', module)
  .addDecorator(muiTheme())
  .add('Rot', () => {
    return (
      <div style={{ padding: 8 }}>
        <VenstreVinduContainer />
      </div>
    )
  })
