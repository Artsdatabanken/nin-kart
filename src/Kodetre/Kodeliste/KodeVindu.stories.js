import React from 'react'
import { storiesOf } from '@storybook/react'
import KodeVindu from './KodeVindu'
import { muiTheme } from 'storybook-addon-material-ui'
import { action } from '@storybook/addon-actions/dist/index'

var api = {
  kode: 'NA_H',
  tittel: 'Marine vannmasser',
  forelder: {
    kode: 'NA',
    tittel: 'Natursystem',
  },
  barn: [
    {
      kode: 'NA_H1',
      antall: 24,
      harBarn: true,
    },
    {
      kode: 'NA_H2',
      antall: 247,
      harBarn: true,
    },
    {
      kode: 'NA_H3',
      antall: 47,
      harBarn: true,
    },
  ],
}

const meta = {
  barn: {
    NA_H1: {
      kode: 'NA_H1',
      tittel: {
        nb: 'Havvannmasser',
      },
    },
    NA_H2: {
      kode: 'NA_H2',
      tittel: {
        nb: 'Sirkulerende vannmasser i fysisk avgrensede saltvannsforekomster',
      },
    },
    NA_H3: {
      kode: 'NA_H3',
      tittel: {
        nb:
          'Ikke-sirkulerende marine vannmasser i fysisk avgrensede saltvannsforekomster',
      },
    },
  },
  overordnet: [{ NA: { kode: 'NA', tittel: { nb: 'norsk' } } }],
  kode: 'NA_H',
  infoUrl: 'http://a.b',
  tittel: {
    nb: 'Marine vannmasser',
  },
}

storiesOf('KodeVindu', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <KodeVindu
      data={api}
      meta={meta}
      onUpdateLayerProp={action('updateLayerProp')}
      onMouseEnter={action('mouseEnter')}
      onMouseLeave={action('mouseLeave')}
      onClick={action('click')}
      onShowColorpicker={action('showColorpicker')}
      language={['nb', 'la']}
    />
  ))
