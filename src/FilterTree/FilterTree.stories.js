import React from 'react'
import { storiesOf } from '@storybook/react'
import FilterTree from './FilterTree'
import { muiTheme } from 'storybook-addon-material-ui'
import { action } from '@storybook/addon-actions/dist/index'

const dummyNatureAreas = [
  {
    id: '1',
    code: '1',
    name: 'Østfold',
    count: 7116,
    children: [
      { id: '101', name: 'Halden', count: 194, children: [] },
      { id: '104', name: 'Moss', count: 877, children: [] },
      { id: '105', name: 'Sarpsborg', count: 127, children: [] },
      { id: '106', name: 'Fredrikstad', count: 1691, children: [] },
      { id: '111', name: 'Hvaler', count: 3450, children: [] },
      { id: '118', name: 'Aremark', count: 127, children: [] },
    ],
  },
  {
    id: '2',
    code: '2',
    name: 'Akershus',
    count: 1791,
    children: [
      { id: '231', name: 'Skedsmo', count: 230, children: [] },
      { id: '233', name: 'Nittedal', count: 71, children: [] },
      { id: '234', name: 'Gjerdrum', count: 30, children: [] },
      { id: '236', name: 'Nes', count: 10, children: [] },
      { id: '237', name: 'Eidsvoll', count: 28, children: [] },
      { id: '239', name: 'Hurdal', count: 130, children: [] },
    ],
  },
]

const dummyRedlistTheme = [
  {
    id: '3',
    code: '3',
    name: 'Fjæresone',
    count: 224,
    children: [
      {
        id: '22',
        code: '22',
        name: 'Sanddynemark',
        count: 224,
        children: null,
      },
    ],
  },
  {
    id: '2',
    code: null,
    name: 'Fjell, rasmark og annen grunnlendt mark',
    count: 1012,
    children: [
      {
        id: '15',
        code: '15',
        name: 'Åpen flomfastmark',
        count: 981,
        children: null,
      },
      {
        id: '13',
        code: '13',
        name: 'Isinnfrysingsmark',
        count: 22,
        children: null,
      },
    ],
  },
  {
    id: '9',
    code: '9',
    name: 'Våtmark',
    count: 3900,
    children: [
      {
        id: '77',
        code: '77',
        name: 'Flommyr, myrkant og myrskogsmark',
        count: 3608,
        children: null,
      },
      {
        id: '69',
        code: '69',
        name: 'Svak kilde og kildeskogsmark',
        count: 124,
        children: null,
      },
    ],
  },
]

const dummyRedlistCategories = [
  { id: '3', code: '3', name: 'EN', count: 2485, children: null },
  { id: '4', code: '4', name: 'VU', count: 6240, children: null },
]

storiesOf('FilterTree', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <div>
      <span>Dummy-tre, ignorerer checkbox-klikk </span>
      <FilterTree
        natureAreas={dummyNatureAreas}
        redlistTheme={dummyRedlistTheme}
        redlistCategories={dummyRedlistCategories}
        handleCheckChange={action('change')}
        isSelected={action('selection')}
      />
    </div>
  ))
