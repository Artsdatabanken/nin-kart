import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { muiTheme } from 'storybook-addon-material-ui'
import AppBar from './TopBar'

const dummyTaxon = [
  {
    id: 1045,
    aggreggatedCount: 494614,
    scientificName: 'Agaricomycetes',
    popularName: null,
  },
]

storiesOf('App Bar', module)
  .addDecorator(muiTheme())
  .add('root', () => <AppBar taxon={dummyTaxon} onClick={action('click')} />)
  .add('down into tree', () => <AppBar taxon={dummyTaxon} />)
