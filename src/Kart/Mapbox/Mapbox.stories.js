import React from 'react'
import { storiesOf } from '@storybook/react'

import Mapbox from './Mapbox'

storiesOf('Kart Mapbox', module)
  .add("default", () => {
    return <Mapbox latitude={63} longitude={10} zoom={4} />
  })
