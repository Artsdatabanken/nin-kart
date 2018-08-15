import React from 'react'
import Bakgrunnskart from './Bakgrunnskart'
import Polygon from './Polygon'
import Terreng from './Terreng'
class Tweaks extends React.Component {
  state = {}

  setFargeKode(kode, farge) {
    let farger = JSON.parse(localStorage.getItem('customColors') || '[]')
    farger = farger.filter(x => x.kode !== kode)
    farger.push({ kode: kode, farge: farge })
    localStorage.setItem('customColors', JSON.stringify(farger))
    this.updateColor(kode, farge)
  }

  getFargeKode = () => {
    let kode = this.props.kode
    if (localStorage) {
      let customColors = localStorage.getItem('customColors')
      if (customColors) {
        let fargeElement = JSON.parse(customColors).filter(x => x.kode === kode)
        return fargeElement && fargeElement[0] && fargeElement[0].farge
          ? fargeElement[0].farge
          : this.props.farge
      }
    }
    return this.props.farge
  }

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
        return (
          <Polygon
            {...this.props}
            farge={this.getFargeKode()}
            setFargeKode={this.setFargeKode}
          />
        )
    }
  }

  render() {
    return <div style={{ padding: 16 }}>{this.seksjon(this.props.kode)}</div>
  }
}

export default Tweaks
