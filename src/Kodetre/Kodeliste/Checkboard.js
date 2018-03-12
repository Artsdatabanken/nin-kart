import React from 'react'
import * as checkboard from 'react-color/lib/helpers/checkboard'

const Checkboard = ({ color, white, grey, size, renderers, borderRadius }) => {
  const styles = {
    grid: {
      borderRadius,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundImage: `url(${checkboard.get(
        white,
        grey,
        size,
        renderers.canvas
      )})`,
    },
  }
  return (
    <div style={styles.grid}>
      <div
        style={{
          border: '1px solid hsla(0, 0%, 0%, 0.2)',
          borderRadius,
          backgroundColor: color,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </div>
  )
}

Checkboard.defaultProps = {
  size: 8,
  white: 'transparent',
  grey: 'rgba(0,0,0,.08)',
  renderers: {},
}

export default Checkboard
