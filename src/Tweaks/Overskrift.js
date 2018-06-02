import muiThemeable from 'material-ui/styles/muiThemeable'
import React, { Component } from 'react'

class Overskrift extends Component {
  render() {
    const muiTheme = this.props.muiTheme
    return (
      <div
        style={{
          color: muiTheme.palette.accent1Color,
          fontFamily: muiTheme.fontFamily,
          fontWeight: 500,
          paddingTop: 8,
          paddingBottom: 16,
        }}
      >
        {this.props.children}
      </div>
    )
  }
}

export default muiThemeable()(Overskrift)
