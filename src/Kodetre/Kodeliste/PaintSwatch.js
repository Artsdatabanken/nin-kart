import React from 'react'
import checkboard from './checkerboard.png'

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
      backgroundImage: `linear-gradient(to bottom, ${color}, ${color}), url(${checkboard})`,
    }}
  />
)

export default PaintSwatch
