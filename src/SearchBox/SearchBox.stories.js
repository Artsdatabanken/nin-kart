import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import SearchBox from './SearchBox'

storiesOf('SearchBox', module)
  .addDecorator(muiTheme())
  .add('default', () => <SearchBox />)
