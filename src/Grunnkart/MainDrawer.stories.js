import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { action } from '@storybook/addon-actions/dist/index'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import MainDrawer from './MainDrawer'

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
