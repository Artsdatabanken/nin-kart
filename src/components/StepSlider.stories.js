import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import StepSlider from './StepSlider'
import { muiTheme } from 'storybook-addon-material-ui'

var sliderValues = {
  code: '7GR',
  name: 'GrøftingsIntensitet',
  values: [
    {
      code: 1,
      value: 'Intakt',
      description: 'Uten grøftingsinngrep',
    },
    {
      code: 2,
      value: 'Ubetydelig grøftingsinngrep',
      description:
        'Grøfting som har gitt, eller forventes å gi, opphav til observerbar effekt på artssammensetningen',
    },
    {
      code: 3,
      value: 'Nokså lite grøftingsinngrep',
      description:
        'Grøfting som har gitt, eller forventes å gi, opphav til betydelig endring i artssammensetningen innenfor en gitt hovedtype',
    },
    {
      code: 4,
      value: 'Omfattende grøfting',
      description:
        'Grøfting som har gitt, eller forventes å gi, opphav til vesentlig endring i artssammensetningen og som dermed gir opphav til V12 Grøftet torvmark',
    },
    {
      code: 5,
      value: 'Gjennomgripende grøfting',
      description:
        'Grøfting som har gitt, eller forventes å gi, opphav til en så sterk endring i artssammensetningen at det utvikles et fastmarkssystem',
    },
  ],
}

storiesOf('Stepslider', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <StepSlider
      name={sliderValues.name}
      code={sliderValues.code}
      min={0}
      max={sliderValues.values.length}
      step={1}
      value={0}
      currentStepName={''}
      currentStepDescription={''}
      onChange={action('change')}
    />
  ))
