import React from 'react'
import { storiesOf } from '@storybook/react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { defaultMapStyle } from './MapStyle'

import Mapbox from './Mapbox'

storiesOf('Kart Mapbox', module).add('default', () => {
  return (
    <MuiThemeProvider>
      <div>
        <Mapbox
          latitude={63}
          longitude={10}
          zoom={4}
          mapStyle={defaultMapStyle}
        />
      </div>
    </MuiThemeProvider>
  )
})
