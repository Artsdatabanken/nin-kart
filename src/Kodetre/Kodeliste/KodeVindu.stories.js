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
      tittel: 'Havvannmasser',
      color: 'rgba(96,96,255,1.0)',
      foto: 'https://artsdatabanken.no/Media/F16499?mode=480x480',
    },
    NA_H2: {
      color: 'rgba(96,96,255,0.75)',
      kode: 'NA_H2',
      tittel: 'Vannmasser i fjorder, poller og litoralbasseng',
      foto: 'https://artsdatabanken.no/Media/F1200?mode=480x480',
    },
    NA_H3: {
      kode: 'NA_H3',
      tittel: 'Dypvann i poller og fjorder',
      color: 'rgba(96,96,255,0.5)',
      foto: 'https://artsdatabanken.no/Media/F16499?mode=480x480',
    },
    NA_H4: {
      kode: 'NA_H4',
      tittel: 'Sterkt endrede marine vannmasser',
      color: 'rgba(96,96,255,0.25)',
      foto: 'https://artsdatabanken.no/Media/F16499?mode=480x480',
    },
  },
  ingress:
    'Marine vannmasser omfatter økosystemer av flytende, svevende og svømmende organismer i de frie vannmassene i saltvann (saltholdighet > 0,5 ‰)\n',
  selv: {
    tittel: 'Marine vannmasser',
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
