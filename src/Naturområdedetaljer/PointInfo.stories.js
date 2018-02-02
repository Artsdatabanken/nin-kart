import React from 'react'
import { storiesOf } from '@storybook/react'
import PointInfo from './PointInfo'
import { muiTheme } from 'storybook-addon-material-ui'

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

storiesOf('PointInfo', module)
  .addDecorator(muiTheme())
  .add('default', () => <PointInfo pointInfo={dummyItems} />)
