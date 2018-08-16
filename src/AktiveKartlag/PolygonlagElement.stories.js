import { action } from '@storybook/addon-actions/dist/index'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { muiTheme } from 'storybook-addon-material-ui'
import PolygonlagElement from './PolygonlagElement'

const forelder = {
  farge: '#fc61fd',
  kode: 'AO_50',
  tittel: 'Trøndelag',
  barn: {
    'AO_50-01': {
      farge: '#f49943',
      sti: 'ao/50/01',
      tittel: 'Trondheim',
    },
    'AO_50-04': {
      farge: '#f4c543',
      sti: 'ao/50/04',
      tittel: 'Steinkjer',
    },
  },
  erSynlig: true,
  kanSlettes: true,
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
