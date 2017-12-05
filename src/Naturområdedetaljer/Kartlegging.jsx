import React, { Component } from 'react'
import { ListItem } from 'material-ui/List'
import Bestiller from './Bestiller'

class Kartlegging extends Component {
  render() {
    return (
      <div>
        <ListItem>Kartlegging</ListItem>
        <Bestiller {...this.props.owner}  />
      </div>
    )
  }
}

export default Kartlegging
