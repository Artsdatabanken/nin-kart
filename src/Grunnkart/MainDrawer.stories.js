import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import MainDrawer from './MainDrawer'
import { action } from '@storybook/addon-actions/dist/index'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

storiesOf('MainDrawer', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <MuiThemeProvider>
      <div>
        <MainDrawer
          handleChangeBaseMap={action('handleChangeBaseMap')}
          open={true}
          onToggleMainDrawer={action('onToggleMainDrawer')}
        />
      </div>
    </MuiThemeProvider>
  ))
