import { List } from '@material-ui/core/List'
import React, { Component } from 'react'
import Overskrift from '../Overskrift'
import Kontakt from './Kontakt'

class Bestiller extends Component {
  render() {
    return (
      <List>
        <Overskrift>Bestiller</Overskrift>
        <Kontakt {...this.props} />
      </List>
    )
  }
}

export default Bestiller
