import { storiesOf } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { muiTheme } from 'storybook-addon-material-ui'
import Grunnkart from './Grunnkart'

storiesOf('Grunnkart', module)
  .addDecorator(muiTheme())
  .add('Rot', () => {
    return (
      <div style={{ padding: 8 }}>
        {false && (
          <MemoryRouter>
            <Grunnkart />
          </MemoryRouter>
        )}{' '}
      </div>
    )
  })
