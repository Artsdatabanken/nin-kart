import { action } from '@storybook/addon-actions/dist/index'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import VenstreVinduContainer from './VenstreVinduContainer'

storiesOf('VenstreVindu', module)
  .addDecorator(muiTheme())
  .add('Rot', () => {
    return (
      <div style={{ padding: 8 }}>
        <VenstreVinduContainer valgteKoder={[]} />
      </div>
    )
  })
  .add('Complex', () => {
    return (
      <div style={{ padding: 8 }}>
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
          visValgte={false}
        />
      </div>
    )
  })
