import React from 'react'
import { storiesOf } from '@storybook/react'
import Naturomradeinformasjon from './Naturområdeinformasjon'
import { muiTheme } from 'storybook-addon-material-ui'

const dummyItems = {}

storiesOf('Naturområdeinformasjon', module)
  .addDecorator(muiTheme())
  .add('default', () => <Naturomradeinformasjon items={dummyItems} />)
