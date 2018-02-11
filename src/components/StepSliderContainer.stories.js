import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import StepSliderContainer from './StepSliderContainer'
import { muiTheme } from 'storybook-addon-material-ui'

storiesOf('StepSliderContainer', module)
  .addDecorator(muiTheme())
  .add('default', () => <StepSliderContainer />)
