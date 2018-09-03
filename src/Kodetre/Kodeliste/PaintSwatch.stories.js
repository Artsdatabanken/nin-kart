import { storiesOf } from '@storybook/react'
import React from 'react'
import Checkboard from './Checkboard'

storiesOf('PaintSwatch', module).add('collection', () => (
  <React.Fragment>
    {[1, 0.8, 0.6, 0.4, 0.2, 0].map(alpha => (
      <div key={alpha}>
        <Checkboard color={`rgba(0,0,255,${alpha})`} />
        <p>{alpha * 100}% alpha</p>
      </div>
    ))}
  </React.Fragment>
))
