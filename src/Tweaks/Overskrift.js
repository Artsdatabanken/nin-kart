import muiThemeable from 'material-ui/styles/muiThemeable'
import React, { Component } from 'react'

class Overskrift extends Component {
  render() {
    return (
      <div
        style={{
          color: this.props.muiTheme.palette.accent1Color,
          fontWeight: 500,
          paddingTop: 8,
          paddingBottom: 16,
          paddingLeft: 16,
        }}
      >
        {this.props.children}
      </div>
    )
  }
}

export default muiThemeable()(Overskrift)
