import muiThemeable from 'material-ui/styles/muiThemeable'
import React from 'react'
import Label from './Label'
const Innstilling = ({ tittel, undertittel, icon, children, muiTheme }) => (
  <div>
    {undertittel && (
      <div
        style={{
          position: 'absolute',
          right: 32,
          color: muiTheme.palette.disabledColor,
        }}
      >
        {undertittel}
      </div>
    )}
    {true && <Label>{tittel}</Label>}
    <div style={{ position: 'absolute', top: '2px', float: 'left' }}>
      {icon}
    </div>
    <div style={{ display: 'inline-block', left: '8px' }}>
      <div
        style={{
          position: 'relative',
          float: 'left',
          paddingLeft: '16px',
          paddingBottom: '8px',
          width: '328px',
        }}
      >
        {children}
      </div>
    </div>
  </div>
)

export default muiThemeable()(Innstilling)
