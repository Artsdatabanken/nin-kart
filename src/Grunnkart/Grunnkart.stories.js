import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import { MemoryRouter } from 'react-router-dom'
import Grunnkart from './Grunnkart'

storiesOf('Grunnkart', module)
  .addDecorator(muiTheme())
  .add('Rot', () => {
    return (
      <div style={{ padding: 8 }}>
        <MemoryRouter>
          <Grunnkart />
        </MemoryRouter>
      </div>
    )
  })
