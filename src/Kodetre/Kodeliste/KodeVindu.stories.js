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
    { kode: 'NA_H1', navn: 'Havvannmasser', antallArter: 11, harBarn: true },
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
    },
    { kode: 'NA_H4', navn: 'Sterkt endrete marine vannmasser' },
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
    { kode: '~', sti: '', tittel: { nb: 'NiN-kart' } },
  ],
  sti: 'NA/H',
  tittel: { nb: 'Marine vannmasser' },
}

const api2 = {
  kode: 'NA_M8',
  navn: 'Helofytt-saltvannssump',
  antallArter: 1,
  antallNaturomrader: 381,
  areal: 14444776.381085396,
  forelder: { kode: 'NA_M', navn: 'Saltvannsbunnsystemer' },
}
const meta2 = {
  bbox: [[4.955, 58.016], [29.999, 70.526]],
  definisjonsgrunnlag: {
    kode: 'NA_HT-DGA',
    tittel: { nb: 'normal, strukturerende artsgruppe' },
  },
  farge: '#e6f598',
  infoUrl: 'https://www.artsdatabanken.no/NiN2.0/M8',
  ingress:
    'Helofytt-saltvannssump omfatter tette bestander av makrohelofytter, det vil si storvokste sumpplanter med røttene i sublitoral bunn (som ikke tørrlegges ved lavvann), i vannstrandbeltet eller noe opp i landstrandbeltet.\n',
  kode: 'NA_M8',
  kunnskap: {
    generelt: { kode: 'NA_HT-KG2', verdi: 2 },
    inndeling: { kode: 'NA_HT-KG-GI2', verdi: 2 },
  },
  lkm: { u: ['MI_SA', 'MI_IO', 'MI_TV'] },
  nin1: 'S7 [10, 12]',
  nivå: 'hovedtype',
  overordnet: [
    { kode: 'NA_M', sti: 'NA/M', tittel: { nb: 'Saltvannsbunnsystemer' } },
    { kode: 'NA', sti: 'NA', tittel: { nb: 'Natursystem' } },
    { kode: '~', sti: '', tittel: { nb: 'NiN-kart' } },
  ],
  prosedyrekategori: {
    kode: 'NA_HT-PK2',
    tittel: {
      nb:
        'Med variasjon i artssammensetning betinget av strukturerende artsgruppe',
    },
  },
  relasjon: {
    dominerende_mengdeart: {
      AR_100132: {
        kode: 'AR_100132',
        tittel: { la: 'Phragmites australis', nb: 'Takrør' },
        variabel: 'dominerende mengdeart',
      },
    },
    kjennetegnende_tyngdepunktart: {
      AR_99475: {
        kode: 'AR_99475',
        tittel: { la: 'Iris pseudacorus', nb: 'Sverdlilje' },
        variabel: 'kjennetegnende tyngdepunktart',
      },
      AR_99603: {
        kode: 'AR_99603',
        tittel: { la: 'Bolboschoenus maritimus', nb: 'Havsivaks' },
        variabel: 'kjennetegnende tyngdepunktart',
      },
      AR_99698: {
        kode: 'AR_99698',
        tittel: { la: 'Carex paleacea', nb: 'Havstarr' },
        variabel: 'kjennetegnende tyngdepunktart',
      },
      AR_99737: {
        kode: 'AR_99737',
        tittel: { la: 'Carex ×vacillans', nb: 'Saltstarr' },
        variabel: 'kjennetegnende tyngdepunktart',
      },
      AR_99790: {
        kode: 'AR_99790',
        tittel: { la: 'Schoenoplectus tabernaemontani', nb: 'Pollsivaks' },
        variabel: 'kjennetegnende tyngdepunktart',
      },
    },
    mengdeart: {
      AR_99603: {
        kode: 'AR_99603',
        tittel: { la: 'Bolboschoenus maritimus', nb: 'Havsivaks' },
        variabel: '',
      },
    },
    tyngdepunktart: {
      AR_99677: {
        kode: 'AR_99677',
        tittel: { la: 'Carex mackenziei', nb: 'Pølstarr' },
        variabel: '',
      },
    },
    vanlig_art: {
      AR_100058: {
        kode: 'AR_100058',
        tittel: { la: 'Glyceria fluitans', nb: 'Mannasøtgras' },
        variabel: 'vanlig art',
      },
      AR_100061: {
        kode: 'AR_100061',
        tittel: { la: 'Glyceria maxima', nb: 'Kjempesøtgras' },
        variabel: 'vanlig art',
      },
      AR_100132: {
        kode: 'AR_100132',
        tittel: { la: 'Phragmites australis', nb: 'Takrør' },
        variabel: 'vanlig art',
      },
      AR_101845: {
        kode: 'AR_101845',
        tittel: { la: 'Lysimachia thyrsiflora', nb: 'Gulldusk' },
        variabel: 'vanlig art',
      },
      AR_101846: {
        kode: 'AR_101846',
        tittel: { la: 'Lysimachia vulgaris', nb: 'Fredløs' },
        variabel: 'vanlig art',
      },
      AR_102818: {
        kode: 'AR_102818',
        tittel: { la: 'Lythrum salicaria', nb: 'Kattehale' },
        variabel: 'vanlig art',
      },
      AR_103183: {
        kode: 'AR_103183',
        tittel: { la: 'Thalictrum flavum', nb: 'Gul frøstjerne' },
        variabel: 'vanlig art',
      },
      AR_103310: {
        kode: 'AR_103310',
        tittel: { la: 'Filipendula ulmaria', nb: 'Mjødurt' },
        variabel: 'vanlig art',
      },
      AR_99722: {
        kode: 'AR_99722',
        tittel: { la: 'Carex salina', nb: 'Fjærestarr' },
        variabel: 'vanlig art',
      },
      AR_99789: {
        kode: 'AR_99789',
        tittel: { la: 'Schoenoplectus lacustris', nb: 'Sjøsivaks' },
        variabel: 'vanlig art',
      },
    },
  },
  sti: 'NA/M/8',
  tittel: { nb: 'Helofytt-saltvannssump' },
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
  .add('relasjon', () => (
    <KodeVindu
      data={api2}
      meta={meta2}
      onUpdateLayerProp={action('updateLayerProp')}
      onMouseEnter={action('mouseEnter')}
      onMouseLeave={action('mouseLeave')}
      onClick={action('click')}
      onFitBounds={action('onFitBounds')}
      language={['nb', 'la']}
    />
  ))
