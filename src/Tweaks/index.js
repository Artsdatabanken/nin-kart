import React from 'react'
import Terreng from './Terreng'
import Polygon from './Polygon'

class Tweaks extends React.Component {
  state = {}

  setFargeKode(kode, farge) {
    let farger = JSON.parse(localStorage.getItem('customColors') || '[]')
    farger = farger.filter(x => x.kode !== kode)
    farger.push({ kode: kode, farge: farge })
    localStorage.setItem('customColors', JSON.stringify(farger))
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

  handleUpdateLayerProp = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
    console.log(this.props.kode)
    return (
      <div style={{ marginTop: 16, marginBottom: 16, marginLeft: 16 }}>
        {this.props.kode === 'terreng' && (
          <Terreng
            vertikaltOverdriv={this.state.vertikaltOverdriv}
            visKontur={this.state.visKontur}
            konturintervall={this.state.konturintervall}
            onUpdateLayerProp={this.handleUpdateLayerProp}
          />
        )}
        {this.props.kode !== 'terreng' && (
          <Polygon
            onRemove={this.props.onRemoveSelectedLayer}
            item={this.props.item}
            kode={this.props.kode}
            koder={this.props.koder}
            farge={this.getFargeKode()}
            setFargeKode={this.setFargeKode}
            onGoToCode={this.props.onGoToCode}
            onExitToRoot={this.props.onExitToRoot}
          />
        )}
      </div>
    )
  }
}

export default Tweaks
