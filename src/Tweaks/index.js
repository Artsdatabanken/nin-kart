import React from 'react'
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
    return (
      <div style={{ padding: 16, ...this.props.style }}>
        {this.seksjon(this.props.kode)}
      </div>
    )
  }
}

export default Tweaks
