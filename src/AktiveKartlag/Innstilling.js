import React from 'react'
import Label from './Label'

const Innstilling = ({ title, icon, children }) => (
  <div>
    <Label>{title}</Label>
    <div style={{ display: 'inline-block', left: '8px' }}>
      <div style={{ position: 'relative', top: '2px', float: 'left' }}>
        {icon}
      </div>
      <div
        style={{
          position: 'relative',
          float: 'left',
          paddingLeft: '16px',
          paddingBottom: '8px',
          width: '310px',
        }}
      >
        {children}
      </div>
    </div>
  </div>
)

export default Innstilling
