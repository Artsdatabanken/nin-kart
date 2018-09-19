import React from 'react'

const Panel = ({ style, children }) => (
  <div
    style={{
      backgroundColor: '#f5f5f5',
      position: 'fixed',
      top: 0,
      left: 0,
      padding: 0,
      paddingTop: 72,
      bottom: 0,
      width: 408,
      zIndex: -10,
      overflowY: 'auto',
      overflowX: 'hidden',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
      ...style,
    }}
  >
    {children}
  </div>
)

export default Panel
