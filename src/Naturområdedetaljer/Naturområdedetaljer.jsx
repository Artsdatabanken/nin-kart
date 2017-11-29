import React, { Component } from 'react'
import {Paper} from 'material-ui'
import Naturnivå from './Naturnivå'
import Detaljer from './Detaljer'
import Kartlegging from './Kartlegging'

class Naturområdedetaljer extends Component {
  render() {
    return (
      <Paper>
        <Naturnivå />
        <Detaljer />
        <Kartlegging {...this.props.kartlegging} />
      </Paper>
    )
  }
}

export default Naturområdedetaljer
