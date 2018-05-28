import muiThemeable from 'material-ui/styles/muiThemeable'
import React from 'react'

const Label = ({ children, muiTheme }) => (
  <div
    style={{
      position: 'relative',
      fontSize: '12px',
      color: muiTheme.palette.disabledColor,
    }}
  >
    {children}
  </div>
)

export default muiThemeable()(Label)
