import Typography from '@material-ui/core/Typography'
import React, { Component } from 'react'

class Overskrift extends Component {
  render() {
    return (
      <Typography gutterBottom variant="headline" component="h3">
        {this.props.children}
      </Typography>
    )
  }
}

export default Overskrift
