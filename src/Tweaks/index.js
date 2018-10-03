import React from 'react'
import { withRouter } from 'react-router-dom'
import Bakgrunnskart from './bakgrunn/Bakgrunnskart'
import Polygon from './Polygon'
import Terreng from './Terreng'
import Gradient from './Gradient'
import { List } from '@material-ui/core'

class Tweaks extends React.Component {
  state = {}
  seksjon(type) {
    switch (type) {
      case 'bakgrunn':
        return <Bakgrunnskart {...this.props} />
      case 'terreng':
        return <Terreng {...this.props} />
      case 'gradient':
        return <Gradient {...this.props} />
      default:
        console.error('Unknown ' + type)
        return <Polygon {...this.props} />
    }
  }

  render() {
    const { style, type } = this.props
    return <List style={{ ...style }}>{this.seksjon(type)}</List>
  }
}

export default withRouter(Tweaks)
