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
  størsteAreal: 2174024,
  forelder: { kode: 'NA', navn: 'Naturområder' },
  barn: [
    {
      kode: 'NA_H1',
      navn: 'Havvannmasser',
      antallArter: 11,
      antallNaturomrader: 0,
      areal: 413230,
      harBarn: true,
    },
    {
      kode: 'NA_H2',
      navn: 'Sirkulerende vannmasser i fysisk avgrensede saltvannsforekomster',
      antallArter: 10,
      antallNaturomrader: 247,
      areal: 2174024,
      harBarn: true,
    },
    {
      kode: 'NA_H3',
      navn:
        'Ikke-sirkulerende marine vannmasser i fysisk avgrensede saltvannsforekomster',
      antallArter: 0,
      antallNaturomrader: 0,
      areal: 1414410,
      harBarn: false,
    },
    {
      kode: 'NA_H4',
      navn: 'Sterkt endrete marine vannmasser',
      antallArter: 0,
      antallNaturomrader: 0,
      areal: 1666444,
      harBarn: false,
    },
  ],
}

const meta = {
  barn: {
    NA_H1: {
      farge: '#f46d43',
      kode: 'NA_H1',
      sti: 'NA/H/1',
      tittel: { nb: 'Havvannmasser' },
    },
    NA_H2: {
      farge: '#fdae61',
      kode: 'NA_H2',
      sti: 'NA/H/2',
      tittel: {
        nb: 'Sirkulerende vannmasser i fysisk avgrensede saltvannsforekomster',
      },
    },
    NA_H3: {
      farge: '#fee08b',
      kode: 'NA_H3',
      sti: 'NA/H/3',
      tittel: {
        nb:
          'Ikke-sirkulerende marine vannmasser i fysisk avgrensede saltvannsforekomster',
      },
    },
    NA_H4: {
      farge: '#e6f598',
      kode: 'NA_H4',
      sti: 'NA/H/4',
      tittel: { nb: 'Sterkt endrete marine vannmasser' },
    },
  },
  bbox: [[5.176, 58.107], [28.857, 70.144]],
  farge: '#d53e4f',
  infoUrl: 'https://www.artsdatabanken.no/NiN2.0/H',
  ingress:
    'Marine vannmasser omfatter økosystemer av flytende, svevende og svømmende organismer i de frie vannmassene i saltvann (saltholdighet > 0,5 ‰)\n',
  kode: 'NA_H',
  overordnet: [
    { kode: 'NA', sti: 'NA', tittel: { nb: 'Natursystem' } },
    { kode: '~', sti: '', tittel: { nb: 'Økologisk grunnkart' } },
  ],
  sti: 'NA/H',
  tittel: { nb: 'Marine vannmasser' },
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
      onFitBounds={action('onFitBounds')}
      language={['nb', 'la']}
    />
  ))
