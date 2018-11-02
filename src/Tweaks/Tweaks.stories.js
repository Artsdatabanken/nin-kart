import { Paper } from '@material-ui/core'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { muiTheme } from 'storybook-addon-material-ui'
import Tweaks from './'

const na = {
  kode: 'NA_T17',
  type: 'polygon',
  fileFormat: 'pbf',
  farge: 'hsl(105, 26%, 72%)',
  tittel: 'Aktiv skredmark',
  barn: [
    {
      kode: 'NA_T17-E-1',
      tittel: 'Jordskred',
      farge: 'hsl(105, 26%, 72%)',
      erSynlig: true,
      kanSlettes: true,
      'NA_T17-E-2': {
        kode: 'NA_T17-E-2',
        tittel: 'Grus- og sandskred ',
        farge: 'hsl(105, 26%, 72%)',
        erSynlig: true,
        kanSlettes: true,
      },
      'NA_T17-E-3': {
        kode: 'NA_T17-E-3',
        tittel: 'Silt- og leirskred',
        farge: 'hsl(105, 26%, 72%)',
        erSynlig: true,
        kanSlettes: true,
      },
    },
    {
      kode: 'NA_T17-E-2',
      tittel: 'Grus- og sandskred ',
      farge: 'hsl(105, 26%, 72%)',
      erSynlig: true,
      kanSlettes: true,
    },
    {
      kode: 'NA_T17-E-3',
      tittel: 'Silt- og leirskred',
      farge: 'hsl(105, 26%, 72%)',
      erSynlig: true,
      kanSlettes: true,
    },
  ],
}
const lag = {
  visBarn: true,
  bbox: [[59.042, 8.717], [70.439, 30.955]],
  zoom: [0, 12],
  erSynlig: true,
  kanSlettes: true,
  formats: { polygon: 'pbf' },
  kode: 'bakgrunnskart',
  type: 'bakgrunn',
  tittel: 'Basiskart',
  tema: 'Mørk grå',
  erSynlig: true,
  land: true,
  landfarge: '#f2f2f0',
  transport: true,
  transportfarge: '#888',
  vann: true,
  vannfarge: '#cbd0d3',
  kommunegrense: true,
  kommunegrensefarge: 'rgba(175,175,175,1.0)',
  fylkesgrense: true,
  fylkesgrensefarge: 'rgba(185,185,185,1.0)',
  landegrense: true,
  landegrensefarge: 'rgba(195,195,195,1.0)',
  sted_navn: true,
  sted_navn_farge: '#333',
  sted_navn_stroke_farge: [0.9, 0.9, 0.9, 0.4],
  sted_navn_stroke_width: 3,
  terreng: {
    vertikaltOverdriv: 2.0,
    visKontur: false,
    visEtikettTopp: false,
    konturintervall: 100.0,
    visEtikettKontur: true,
  },
}

const Wrapper = ({ children, url }) => (
  <MemoryRouter initialEntries={url && [url]}>
    <Paper
      elevation={1}
      style={{ margin: 16, padding: 16, backgroundColor: '#eee', width: 400 }}
    >
      {children}
    </Paper>
  </MemoryRouter>
)

storiesOf('Tweaks', module)
  .addDecorator(muiTheme())
  .add('bakgrunn', () => (
    <Wrapper url="/lag/bakgrunnskart">
      <Tweaks type={'bakgrunn'} {...lag} />
    </Wrapper>
  ))
  .add('bakgrunn transport', () => (
    <Wrapper url="/lag/bakgrunnskart/transport">
      <Tweaks type={'bakgrunn'} />
    </Wrapper>
  ))
  .add('bakgrunn tema', () => (
    <Wrapper url="/lag/bakgrunnskart/tema">
      <Tweaks type={'bakgrunn'} />
    </Wrapper>
  ))
  .add('terreng', () => (
    <Wrapper>
      <Tweaks type={'terreng'} terreng={lag.terreng} />
    </Wrapper>
  ))
  .add('polygon', () => (
    <Wrapper>
      <Tweaks type="polygon" {...na} />
    </Wrapper>
  ))
