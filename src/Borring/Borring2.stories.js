import { storiesOf } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { muiTheme } from 'storybook-addon-material-ui'
import BorreAdapter from './BorreAdapter'
import { SettingsContext } from '../SettingsContext'
import { Paper } from '@material-ui/core'

// https://www.norgeskart.no/ws/elev.py?lat=59.06746185746856&lon=10.902166371363768&epsg=4258
const sted = {
  placename: 'Spjærevarden',
  elevation: 23.5,
  stedsnummer: 843278,
}

// https://vector.artsdatabanken.no/ogapi/codes/10.902166371363768/59.06746185746856
var data = {
  VV_2752: {
    key: 'Naturvernområde',
    value: 'Ytre Hvaler',
  },
  'AO_01-11': {
    key: 'Østfold',
    value: 'Hvaler',
  },
  'NA_T1-C-2': {
    key: 'Nakent berg',
    value:
      'Uttørkingseksponerte svært og temmelig kalkfattige berg, bergvegger og knauser',
    id: 'BFA193E7-BDAE-428F-A1EA-3847AC52C1CE',
    fraction: 4,
    created: '2016-07-06T15:37:11',
  },
  'NA_T2-C-1': {
    key: 'Åpen grunnlendt mark',
    value: 'Åpen kalkfattig grunnlendt lyngmark',
    id: 'BFA193E7-BDAE-428F-A1EA-3847AC52C1CE',
    fraction: 6,
    created: '2016-07-06T15:36:42',
  },
  'BS_1AG-A-0_3': {
    key: 'Tresjiktsdekning - total dekning ',
    value: '5 - 10 % dekning',
  },
  'BS_5XG-SM_1': {
    key: 'Små objekter',
    value: '0 – 1/16',
  },
  'BS_5XG-ST_0': {
    key: 'Store objekter',
    value: '0',
  },
  BS_7FA_0: {
    key: 'Fremmedartsinnslag',
    value: 'Uten fremmedarter',
  },
  BS_7SE_0: {
    key: 'Spor etter slitasje og slitasjebetinget erosjon',
    value: '0',
  },
  BS_7TK_0: {
    key: 'Spor etter ferdsel med tunge kjøretøy',
    value: '0',
  },
  'BS_6SO-1': {
    key: 'Bioklimatiske soner',
    value: 'Boreonemoral sone (bn)',
  },
  AO_01: {
    key: 'Fylke & kommune',
    value: 'Østfold',
  },
  'MI_KA-A': {
    key: 'Kalkinnhold',
    value: 'Svært kalkfattig',
  },
  'BS_6SE-4': {
    key: 'Bioklimatiske seksjoner',
    value: 'Overgangsseksjon (oc)',
  },
}

storiesOf('Borring 2', module)
  .addDecorator(muiTheme())
  .add('Borring 2', () => (
    <MemoryRouter>
      <SettingsContext.Provider value={{ visKoder: true }}>
        <Paper elevation={4} style={{ width: 408 }}>
          <BorreAdapter
            data={data}
            sted={sted}
            lat={59.06746185746856}
            lng={10.902166371363768}
          />
        </Paper>
      </SettingsContext.Provider>
    </MemoryRouter>
  ))
