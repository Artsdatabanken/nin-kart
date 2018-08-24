import React from 'react'
import { withRouter } from 'react-router-dom'
import Bakgrunnskart from './bakgrunn/Bakgrunnskart'
import Polygon from './Polygon'
import Terreng from './Terreng'

class Tweaks extends React.Component {
  state = {}

  seksjon(kode) {
    switch (kode) {
      case 'bakgrunnskart':
        return <Bakgrunnskart {...this.props} />
      case 'terreng':
        return <Terreng {...this.props} />
      default:
        return <Polygon {...this.props} />
    }
  }

  render() {
    const { style, kode } = this.props
    return <div style={{ padding: 16, ...style }}>{this.seksjon(kode)}</div>
  }
}

export default withRouter(Tweaks)
