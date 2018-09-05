import { Paper } from '@material-ui/core'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { muiTheme } from 'storybook-addon-material-ui'
import Tweaks from './'

const rl = {
  kode: 'RL',
  farge: 'hsl(12, 40%, 70%)',
  tittel: 'Truet art/natur',
  barn: [
    {
      kode: 'RL_DD',
      tittel: 'Datamangel',
      farge: '#808080',
      erSynlig: true,
      kanSlettes: true,
    },
    {
      kode: 'RL_EN',
      tittel: 'Sterkt truet',
      farge: '#FFA500',
      erSynlig: true,
      kanSlettes: true,
    },
    {
      kode: 'RL_NT',
      tittel: 'Nær truet',
      farge: '#AEFF2F',
      erSynlig: true,
      kanSlettes: true,
    },
    {
      kode: 'RL_VU',
      tittel: 'Sårbar',
      farge: '#FFFF00',
      erSynlig: true,
      kanSlettes: true,
    },
  ],
  visBarn: true,
  erSynlig: true,
  kanSlettes: true,
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
      <Tweaks kode={'bakgrunnskart'} />
    </Wrapper>
  ))
  .add('bakgrunn transport', () => (
    <Wrapper url="/lag/bakgrunnskart/transport">
      <Tweaks kode={'bakgrunnskart'} />
    </Wrapper>
  ))
  .add('bakgrunn tema', () => (
    <Wrapper url="/lag/bakgrunnskart/tema">
      <Tweaks kode={'bakgrunnskart'} />
    </Wrapper>
  ))
  .add('terreng', () => (
    <Wrapper>
      <Tweaks kode={'terreng'} />
    </Wrapper>
  ))
  .add('polygon', () => (
    <Wrapper>
      <Tweaks {...rl} />
    </Wrapper>
  ))
