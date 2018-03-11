import React from 'react'
import { storiesOf } from '@storybook/react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { defaultMapStyle } from './MapStyle'
import { BrowserRouter } from 'react-router-dom'
import Mapbox from '.'

storiesOf('Kart Mapbox', module).add('default', () => {
  return (
    <MuiThemeProvider>
      <BrowserRouter>
        <div>
          <Mapbox
            latitude={63}
            longitude={10}
            zoom={4}
            mapStyle={defaultMapStyle}
          />
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  )
})
