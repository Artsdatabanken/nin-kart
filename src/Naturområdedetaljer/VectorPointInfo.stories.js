import { storiesOf } from '@storybook/react'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import VectorPointInfo from './VectorPointInfo'

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
  .add('default', () => <VectorPointInfo pointInfo={dummyItems} />)
