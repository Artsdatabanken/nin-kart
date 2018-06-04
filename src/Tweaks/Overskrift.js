import { Subheader } from 'material-ui'
import React, { Component } from 'react'
class Overskrift extends Component {
  render() {
    return <Subheader>{this.props.children}</Subheader>
  }
}

export default Overskrift
