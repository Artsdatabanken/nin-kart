import React from 'react'
import Checkboard from './Checkboard'

const PaintSwatch = ({ color, onClick, muiTheme }) => (
  <Checkboard
    color={color}
    style={{
      xborder: '1px solid hsla(0, 0%, 0%, 0.2)',
    }}
  />
)

export default PaintSwatch
