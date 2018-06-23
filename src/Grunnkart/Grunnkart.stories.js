import { storiesOf } from '@storybook/react'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import Grunnkart from './Grunnkart'

storiesOf('Grunnkart', module)
  .addDecorator(muiTheme())
  .add('Rot', () => {
    return (
      <div style={{ padding: 8 }}>
        <Grunnkart location={{ pathname: 'asdf' }} />
      </div>
    )
  })
