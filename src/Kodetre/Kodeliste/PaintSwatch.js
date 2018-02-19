import React from 'react'
import * as checkboard from 'react-color/lib/helpers/checkboard'
import Checkboard from './Checkboard'

const PaintSwatch = ({ color, onClick }) => (
  <div
    onClick={e => {
      onClick(e)
    }}
    style={{
      top: '14px',
      right: '14px',
      height: '28px',
      width: '28px',
      borderRadius: '50%',
    }}
  >
    <Checkboard borderRadius="10%" color={color} />
  </div>
)

export default PaintSwatch
