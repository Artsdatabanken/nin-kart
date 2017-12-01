import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'

import Naturområdedetaljer from './Naturområdedetaljer'

// const kartlegging = {
//     company:"Miljødirektoratet",
//     contactPerson: "kjepet (Kjetil Pettersson)",
//     email: "kjetil.pettersson@miljodir.no",
//     homesite: null,
//     phone: "92605760"
// }

storiesOf('Naturområdedetaljer', module)
  .addDecorator(muiTheme())
  .add('naturområdedetaljer', () => {
    return <Naturområdedetaljer natureAreaId={'3e9bdc8b-3b7a-490c-bac6-ac5d3b0ccf27'} />
  })
