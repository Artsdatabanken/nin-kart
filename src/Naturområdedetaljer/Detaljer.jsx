import React, { Component } from 'react'
import { ListItem } from 'material-ui/List'

class Detaljer extends Component {

  render() {
    return <ListItem>{this.props.description}</ListItem>
  }
}

export default Detaljer
