import { Typography } from '@material-ui/core'
import React, { Component } from 'react'
import { Nature, LocationCity } from '@material-ui/icons'
import Filter from './Filter'

class Arealbruksintensitet extends Component {
  render() {
    const { value, onChange } = this.props
    return (
      <Filter value={value} icons={[Nature, LocationCity]} onChange={onChange}>
        Arealbruksintensitet
      </Filter>
    )
  }
}

export default Arealbruksintensitet
