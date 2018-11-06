import React from 'react'

const Panel = ({ style, children }) => (
  <div
    style={{
      color: 'hsla(0, 0%, 0%, 0.87)',
      display: 'flex',
      height: '100vh',
      flexDirection: 'column',
      backgroundColor: '#f5f5f5',
      padding: 0,
      width: 408,
      zIndex: -10,
      overflow: 'hidden',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
      ...style,
    }}
  >
    <div
      style={{
        overflowY: 'auto',
      }}
    >
      {children}
    </div>
  </div>
)

export default Panel
