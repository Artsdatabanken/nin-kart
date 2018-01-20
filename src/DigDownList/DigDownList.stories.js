import React from 'react'
import { storiesOf } from '@storybook/react'
import DigDownList from './DigDownList'
import { muiTheme } from 'storybook-addon-material-ui'
import { action } from '@storybook/addon-actions/dist/index'

var dummyItems = [
  {
    id: 1045,
    aggreggatedCount: 494614,
    scientificName: 'Agaricomycetes',
    popularName: null,
  },
]

storiesOf('DigDownList', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <DigDownList
      items={dummyItems}
      isSelected={action('selection')}
      onClick={action('click')}
      onCheck={action('check')}
    />
  ))
