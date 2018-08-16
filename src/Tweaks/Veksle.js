import { withTheme } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import React from 'react'
import Label from './Label'

const Veksle = ({ tittel, icon, toggled, disabled, onClick, muiTheme }) => (
  <div style={{ display: 'block', height: 48 }}>
    <div
      style={{
        float: 'right',
        position: 'relative',
        top: -16,
      }}
    >
      <Switch checked={toggled} disabled={disabled} onClick={onClick} />
    </div>
    <div style={{ width: 260 }}>
      <Label disabled={disabled}>{tittel}</Label>
    </div>
  </div>
)

export default withTheme()(Veksle)
