import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import { MemoryRouter } from 'react-router-dom'
import VenstreVinduContainer from './VenstreVinduContainer'
import { action } from '@storybook/addon-actions/dist/index'

storiesOf('VenstreVindu', module)
  .addDecorator(muiTheme())
  .add('Rot', () => {
    return (
      <div style={{ padding: 8 }}>
        <MemoryRouter>
          <VenstreVinduContainer valgteKoder={[]} />
        </MemoryRouter>
      </div>
    )
  })
  .add('Complex', () => {
    return (
      <div style={{ padding: 8 }}>
        <MemoryRouter>
          <VenstreVinduContainer
            valgteKoder={[]}
            onToggleMainDrawer={action('onToggleMainDrawer')}
            onMouseEnter={action('onMouseEnter')}
            onMouseLeave={action('onMouseLeave')}
            onFitBounds={action('onFitBounds')}
            onAddSelected={action('onAddSelected')}
            onExitToRoot={action('onExitToRoot')}
            localId={''}
            meta={''}
            onShowColorpicker={action('onShowColorpicker')}
            ekspandertKode={''}
            visValgte={false}
          />
        </MemoryRouter>
      </div>
    )
  })
