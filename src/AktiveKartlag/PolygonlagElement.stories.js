import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import { action } from '@storybook/addon-actions/dist/index'
import { MemoryRouter } from 'react-router-dom'
import PolygonlagElement from './PolygonlagElement'

const forelder = {
  barn: {
    NA_F: {
      farge: 'rgb(48, 17, 201)',
      sti: 'na/f',
      tittel: {
        nb: 'Limniske vannmasser',
      },
      kode: 'NA_F',
      vis: false,
    },
    NA_HT: {
      farge: '#66c2bc',
      sti: 'na/ht',
      tittel: {
        nb: 'Hovedtyper',
      },
      kode: 'NA_HT',
      vis: false,
    },
    NA_I: {
      farge: '#669ac2',
      sti: 'na/i',
      tittel: {
        nb: 'Sn\u00f8- og issystemer',
      },
      kode: 'NA_I',
      vis: false,
    },
    NA_L: {
      farge: 'rgb(114, 236, 49)',
      sti: 'na/l',
      tittel: {
        nb: 'Ferskvannsbunnsystemer',
      },
      kode: 'NA_L',
      vis: false,
    },
    NA_M: {
      farge: 'rgb(64, 36, 209)',
      sti: 'na/m',
      tittel: {
        nb: 'Saltvannsbunnsystemer',
      },
      kode: 'NA_M',
      vis: false,
    },
    NA_T: {
      farge: 'rgb(121, 136, 62)',
      sti: 'na/t',
      tittel: {
        nb: 'Fastmarkssystemer',
      },
      kode: 'NA_T',
      vis: false,
    },
    NA_V: {
      farge: '#8e66c2',
      sti: 'na/v',
      tittel: {
        nb: 'V\u00e5tmarkssystemer',
      },
      kode: 'NA_V',
      vis: false,
    },
  },
  bbox: [5.073, 58.038, 4.704, 57.96],
  farge: '#fefd8b',
  infoUrl: 'https://www.artsdatabanken.no/Pages/222921',
  ingress:
    'Natursystem defineres av \u00aballe organismer innen et mer eller mindre enhetlig, avgrensbart omr\u00e5de, det totale milj\u00f8et de lever i og er tilpasset til, og de prosesser som regulerer relasjoner organismene imellom og mellom organismer og milj\u00f8 (herunder menneskelig aktivitet)\u00bb',
  kode: 'NA',
  overordnet: [
    {
      kode: '~',
      sti: '',
      tittel: {
        nb: 'Natur i Norge',
      },
    },
  ],
  sti: 'na',
  tittel: {
    nb: 'Natursystem',
  },
  vis: false,
}

storiesOf('PolygonlagElement', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <div style={{ width: 400 }}>
      <MemoryRouter>
        <PolygonlagElement
          {...forelder}
          key={'valgt' + forelder.kode}
          kode={forelder.kode}
          vis={true}
          onMouseEnter={action('mouseEnter')}
          onMouseLeave={action('mouseLeave')}
          onRemove={action('onRemove')}
          onClick={action('onClick')}
        />
      </MemoryRouter>
    </div>
  ))
