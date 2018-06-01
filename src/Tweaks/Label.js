import muiThemeable from 'material-ui/styles/muiThemeable'
import React from 'react'

const Label = ({ children, muiTheme }) => (
  <div
    style={{
      position: 'relative',
      float: 'left',
      left: 16,
      fontFamily: muiTheme.fontFamily,
      fontSize: 16,
      fontWeight: 500,
      color: muiTheme.palette.disabledColor,
    }}
  >
    {children}
  </div>
)

export default muiThemeable()(Label)
