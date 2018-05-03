import React from 'react'
import { storiesOf } from '@storybook/react'
import VectorPointInfo from './VectorPointInfo'
import { muiTheme } from 'storybook-addon-material-ui'
import { MemoryRouter } from 'react-router-dom'

const dummyItems = {
  Høyde: {
    value: 42,
  },
  KA: {
    value: 'litt kalkfattig',
    name: 'Kalkinnhold',
  },
  Kommunenavn: {
    value: 'Bodø',
  },
}

storiesOf('VectorPointInfo', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <MemoryRouter>
      <VectorPointInfo pointInfo={dummyItems} />
    </MemoryRouter>
  ))
