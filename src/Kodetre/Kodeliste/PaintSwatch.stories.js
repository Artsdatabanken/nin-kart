import { action } from '@storybook/addon-actions/dist/index'
import { storiesOf } from '@storybook/react'
import React from 'react'
import PaintSwatch from './PaintSwatch'

storiesOf('PaintSwatch', module).add('collection', () => (
  <React.Fragment>
    {[1, 0.8, 0.6, 0.4, 0.2, 0].map(alpha => (
      <div key={alpha}>
        <PaintSwatch color={`rgba(0,0,255,${alpha})`} onClick={action} />
        <p>{alpha * 100}% alpha</p>
      </div>
    ))}
  </React.Fragment>
))
