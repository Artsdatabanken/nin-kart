import React from 'react'
import { storiesOf } from '@storybook/react'
import KodeVindu from './KodeVindu'
import { muiTheme } from 'storybook-addon-material-ui'
import { action } from '@storybook/addon-actions/dist/index'

var api = {
  kode: 'NA_H',
  navn: 'Marine vannmasser',
  antallArter: 11,
  antallNaturomrader: 247,
  areal: 21740243.9505291,
  forelder: { kode: 'NA', navn: 'Naturområder' },
  barn: [
    {
      kode: 'NA_H1',
      navn: 'Havvannmasser',
      antallArter: 11,
      antallNaturomrader: 0,
      areal: 0.0,
      harBarn: true,
    },
    {
      kode: 'NA_H2',
      navn: 'Sirkulerende vannmasser i fysisk avgrensede saltvannsforekomster',
      antallArter: 10,
      antallNaturomrader: 247,
      areal: 21740243.9505291,
      harBarn: true,
    },
    {
      kode: 'NA_H3',
      navn:
        'Ikke-sirkulerende marine vannmasser i fysisk avgrensede saltvannsforekomster',
      antallArter: 0,
      antallNaturomrader: 0,
      areal: 0.0,
      harBarn: false,
    },
    {
      kode: 'NA_H4',
      navn: 'Sterkt endrete marine vannmasser',
      antallArter: 0,
      antallNaturomrader: 0,
      areal: 0.0,
      harBarn: false,
    },
  ],
}

const meta = {
  barn: {
    NA_H1: {
      farge: '#abdda4',
      kode: 'NA_H1',
      tittel: { nb: 'Havvannmasser' },
      url: 'NA/H/1',
    },
    NA_H2: {
      farge: '#f46d43',
      kode: 'NA_H2',
      tittel: {
        nb: 'Sirkulerende vannmasser i fysisk avgrensede saltvannsforekomster',
      },
      url: 'NA/H/2',
    },
    NA_H3: {
      farge: '#fee08b',
      kode: 'NA_H3',
      tittel: {
        nb:
          'Ikke-sirkulerende marine vannmasser i fysisk avgrensede saltvannsforekomster',
      },
      url: 'NA/H/3',
    },
    NA_H4: {
      farge: '#abdda4',
      kode: 'NA_H4',
      tittel: { nb: 'Sterkt endrete marine vannmasser' },
      url: 'NA/H/4',
    },
  },
  bbox: [[5.176, 58.107], [28.857, 70.144]],
  farge: '#e6f598',
  ingress:
    'Marine vannmasser omfatter økosystemer av flytende, svevende og svømmende organismer i de frie vannmassene i saltvann (saltholdighet > 0,5 ‰)\n',
  kode: 'NA_H',
  overordnet: [
    { kode: 'NA', tittel: { nb: 'Natursystem' }, url: 'NA' },
    { kode: '~', tittel: { nb: 'Økologisk grunnkart' }, url: '' },
  ],
  tittel: { nb: 'Marine vannmasser' },
  url: 'NA/H',
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
