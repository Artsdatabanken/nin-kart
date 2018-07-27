import { ListItem } from '@material-ui/core/List'
import React, { Component } from 'react'
import Bestiller from './Bestiller'

class Kartlegging extends Component {
  render() {
    return (
      <div>
        <ListItem>Kartlegging</ListItem>
        <Bestiller {...this.props.owner} />
      </div>
    )
  }
}

export default Kartlegging
