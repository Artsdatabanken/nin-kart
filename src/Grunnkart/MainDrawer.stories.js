import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { action } from '@storybook/addon-actions/dist/index'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { muiTheme } from 'storybook-addon-material-ui'
import MainDrawer from './MainDrawer'

storiesOf('MainDrawer', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <MuiThemeProvider>
      <MemoryRouter>
        <div>
          asdf
          <MainDrawer
            xerÅpen={true}
            open={true}
            xonOpen={action('onOpen')}
            xonClose={action('onClose')}
            xonToggleMainDrawer={action('onToggleMainDrawer')}
          />
        </div>
      </MemoryRouter>
    </MuiThemeProvider>
  ))
