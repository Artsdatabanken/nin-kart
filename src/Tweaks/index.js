import React from 'react'
import Bakgrunnskart from './Bakgrunnskart'
import Polygon from './Polygon'
import Terreng from './Terreng'
class Tweaks extends React.Component {
  state = {}

  seksjon(kategori) {
    switch (kategori) {
      case 'bakgrunnskart':
        return <Bakgrunnskart {...this.props} />
      case 'terreng':
        return (
          <Terreng
            {...this.props}
            vertikaltOverdriv={this.state.vertikaltOverdriv}
            visKontur={this.state.visKontur}
            visEtikettTopp={this.state.visEtikettTopp}
            konturintervall={this.state.konturintervall}
            visEtikettKontur={this.state.visEtikettKontur}
          />
        )
      default:
        return <Polygon {...this.props} {...this.props.item} />
    }
  }

  render() {
    return <div style={{ padding: 16 }}>{this.seksjon(this.props.kode)}</div>
  }
}

export default Tweaks
