import React from 'react'
import { storiesOf } from '@storybook/react'
import {muiTheme} from 'storybook-addon-material-ui';

import Naturområdedetaljer from './Naturområdedetaljer'

storiesOf('Naturområdedetaljer', module)
.addDecorator(muiTheme())
.add('naturområdedetaljer', () => {
    return <Naturområdedetaljer />
  })
