import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Kontakt from './Kontakt'

class Bestiller extends Component {
  render() {
    return (
      <List>
        <Subheader>Bestiller</Subheader>
        <Kontakt {...this.props}/>
      </List>
    )
  }
}

export default Bestiller
