import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import { action } from '@storybook/addon-actions/dist/index'
import Filter from './Filter'
import Jordbrukspreg from './Jordbrukspreg'
import Brepreg from './Brepreg'
import Vegetasjon from './Vegetasjon'
import Arealbruksintensitet from './Arealbruksintensitet'

storiesOf('Filter', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <div>
      <Arealbruksintensitet
        value={[30, 80]}
        onChange={([min, max]) => console.log(min, max)}
      />
      <Jordbrukspreg
        value={[30, 50]}
        onChange={([min, max]) => console.log(min, max)}
      />
      <Vegetasjon
        value={[0, 100]}
        onChange={([min, max]) => console.log(min, max)}
      />
      <Brepreg
        value={[10, 50]}
        onChange={([min, max]) => console.log(min, max)}
      />
    </div>
  ))
