import muiThemeable from 'material-ui/styles/muiThemeable'
import React from 'react'

const Label = ({ children }) => (
  <div
    style={{
      position: 'relative',
      fontSize: '12px',
      color: this.props.muiTheme.palette.disabledColor,
    }}
  >
    {children}
  </div>
)

export default muiThemeable()(Label)
