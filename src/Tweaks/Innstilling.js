import { withTheme } from '@material-ui/core/styles'
import React from 'react'
import Label from './Label'
const Innstilling = ({
  tittel,
  undertittel,
  icon,
  disabled,
  children,
  muiTheme,
}) => (
  <div>
    {undertittel && (
      <div
        style={{
          fontFamily: muiTheme.fontFamily,
          position: 'absolute',
          right: 16,
          color: muiTheme.palette.disabledColor,
        }}
      >
        {undertittel}
      </div>
    )}
    <Label disabled={disabled}>{tittel}</Label>
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

export default withTheme()(Innstilling)
