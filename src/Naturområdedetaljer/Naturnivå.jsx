import { ListItem } from '@material-ui/core/List'
import React, { Component } from 'react'

class Naturnivå extends Component {
  render() {
    return <ListItem primaryText={this.props.level} secondaryText="Naturnivå" />
  }
}

export default Naturnivå
