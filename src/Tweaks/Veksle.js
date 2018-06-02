import { Toggle } from 'material-ui'
import muiThemeable from 'material-ui/styles/muiThemeable'
import React from 'react'
import Label from './Label'

const Veksle = ({ tittel, icon, toggled, disabled, onClick, muiTheme }) => (
  <div style={{ display: 'block', height: 48 }}>
    <div
      style={{
        float: 'right',
      }}
    >
      <Toggle toggled={toggled} disabled={disabled} onClick={onClick} />
    </div>
    <div style={{ width: 260 }}>
      <Label disabled={disabled}>{tittel}</Label>
    </div>
  </div>
)

export default muiThemeable()(Veksle)
