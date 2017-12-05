import React, { Component } from 'react'
import { ListItem } from 'material-ui/List'

class Naturnivå extends Component {
  render() {
    return <ListItem
        primaryText={this.props.level}
        secondaryText="Naturnivå"
    />
  }
}

export default Naturnivå
