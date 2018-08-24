import React from 'react'
import { withRouter } from 'react-router-dom'
import Bakgrunnskart from './bakgrunn/Bakgrunnskart'
import Polygon from './Polygon'
import Terreng from './Terreng'
class Tweaks extends React.Component {
  state = {}

  seksjon(kategori) {
    switch (kategori) {
      case 'bakgrunnskart':
        return <Bakgrunnskart {...this.props} />
      case 'terreng':
        return <Terreng {...this.props} />
      default:
        return <Polygon {...this.props} />
    }
  }

  render() {
    const { style, kode, koder, history } = this.props
    if (!this.erAktiv(koder, kode)) {
      // Laget er ikke lenger aktivt.  Browser refresh?
      history.replace('/')
      return null
    }
    return <div style={{ padding: 16, ...style }}>{this.seksjon(kode)}</div>
  }

  erAktiv(koder, kode) {
    for (let n of koder || []) if (n.kode === kode) return true
    return false
  }
}

export default withRouter(Tweaks)
