import { action } from '@storybook/addon-actions/dist/index'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
//import { muiTheme } from 'storybook-addon-material-ui'
import MainDrawer from './MainDrawer'

storiesOf('MainDrawer', module)
  //  .addDecorator(muiTheme())
  .add('default', () => (
    <div>
      <MemoryRouter>
        <div>
          <MainDrawer
            erÅpen={false} // TODO: Why is jest failing whtn this is displayed
            toggleDrawer={action('onToggleDrawer')}
            onUpdateSetting={action('onUpdateSetting')}
          />
        </div>
      </MemoryRouter>
    </div>
  ))
