import { withTheme } from '@material-ui/core/styles'
import React from 'react'
import Label from './Label'
const Innstilling = ({
  tittel,
  undertittel,
  icon,
  disabled,
  children,
  theme,
}) => (
  <div>
    {undertittel && (
      <div
        style={{
          fontFamily: theme.typography.fontFamily,
          position: 'absolute',
          right: 16,
          color: theme.palette.text.disabled,
        }}
      >
        {undertittel}
      </div>
    )}
    <Label disabled={disabled}>{tittel}</Label>
    <div style={{ position: 'relative', top: '2px', float: 'left' }}>
      {icon}
    </div>
    <div style={{ display: 'inline-block', left: '8px' }}>
      <div
        style={{
          position: 'relative',
          float: 'left',
          paddingLeft: '32px',
          paddingBottom: '8px',
          paddingTop: '16px',
          width: '328px',
        }}
      >
        {children}
      </div>
    </div>
  </div>
)

export default withTheme()(Innstilling)
