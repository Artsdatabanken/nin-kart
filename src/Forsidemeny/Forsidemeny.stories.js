import { storiesOf } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { muiTheme } from 'storybook-addon-material-ui'
import Forsidemeny from './Forsidemeny'

storiesOf('Forsidemeny', module)
  .addDecorator(muiTheme())
  .add('default', () => {
    return (
      <MemoryRouter>
        <div style={{ padding: 8 }}>
          <Forsidemeny />
        </div>
      </MemoryRouter>
    )
  })
