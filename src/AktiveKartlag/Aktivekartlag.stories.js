import { action } from '@storybook/addon-actions/dist/index'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import AktiveKartlag from '.'

const koder = [{ tittel: { nb: 'aabc' } }]

storiesOf('Aktive kartlag', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <div style={{ width: 400 }}>
      <AktiveKartlag
        koder={koder}
        onMouseEnter={action('mouseEnter')}
        onMouseLeave={action('mouseLeave')}
        onToggleVisible={action('onToggleVisible')}
        onRemoveSelectedLayer={action('onRemoveSelectedLayer')}
      />
    </div>
  ))
