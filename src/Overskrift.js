import { ListSubheader } from '@material-ui/core'
import React, { Component } from 'react'

class Overskrift extends Component {
  render() {
    return (
      <ListSubheader>{this.props.children}</ListSubheader>
      /*      <Typography gutterBottom variant="headline" component="h3">
        {this.props.children}
      </Typography>
    */
    )
  }
}

export default Overskrift
