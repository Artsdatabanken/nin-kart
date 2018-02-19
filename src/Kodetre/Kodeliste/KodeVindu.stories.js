import React from 'react'
import { storiesOf } from '@storybook/react'
import KodeVindu from './KodeVindu'
import { muiTheme } from 'storybook-addon-material-ui'
import { action } from '@storybook/addon-actions/dist/index'

var api = {
  kode: 'NA_H',
  navn: 'Marine vannmasser',
  forelder: {
    kode: 'NA',
    navn: 'Natursystem',
  },
  barn: [
    {
      kode: 'NA_H2',
      navn: 'Sirkulerende vannmasser i fysisk avgrensede saltvannsforekomster',
      antall: 247,
      harBarn: true,
    },
  ],
}

const meta = {
  barn: {
    NA_H1: {
      color: 'rgba(96,96,255,1.0)',
      foto: 'https://artsdatabanken.no/Media/F16499?mode=480x480',
    },
    NA_H2: {
      color: 'rgba(96,96,255,0.75)',
      foto: 'https://artsdatabanken.no/Media/F1200?mode=480x480',
    },
    NA_H3: {
      color: 'rgba(96,96,255,0.5)',
      foto: 'https://artsdatabanken.no/Media/F16499?mode=480x480',
    },
    NA_H4: {
      color: 'rgba(96,96,255,0.25)',
      foto: 'https://artsdatabanken.no/Media/F16499?mode=480x480',
    },
  },
  ingress:
    'Marine vannmasser omfatter økosystemer av flytende, svevende og svømmende organismer i de frie vannmassene i saltvann (saltholdighet > 0,5 ‰)\n',
  selv: {
    foto: 'https://artsdatabanken.no/Media/F16499?mode=480x480',
    media: 'https://artsdatabanken.no/Media/F16499?mode=480x480',
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
    />
  ))
