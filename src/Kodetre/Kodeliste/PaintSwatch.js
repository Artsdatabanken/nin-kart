import React from 'react'
import { Checkboard } from 'react-color/lib/components/common'

const PaintSwatch = ({ color, onClick }) => (
  <div
    onClick={e => {
      onClick(e)
    }}
    style={{
      top: '14px',
      right: '14px',
      height: '40px',
      width: '40px',
      borderRadius: '50%',
    }}
  >
    <Checkboard borderRadius="50%" white={color} />
  </div>
)

export default PaintSwatch
