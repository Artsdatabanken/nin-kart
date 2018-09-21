import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import { action } from '@storybook/addon-actions/dist/index'
import BildeDialog from './BildeDialog'

storiesOf('BildeDialog', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <BildeDialog
      kode="NA_T"
      tittel="tittel"
      handleClose={action('handleClose')}
    />
  ))
