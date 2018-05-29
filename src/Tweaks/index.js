import React from 'react'
import Terreng from './Terreng'

class Tweaks extends React.Component {
  state = {}

  handleUpdateLayerProp = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
    return (
      <div style={{ marginTop: 16, marginBottom: 16, marginLeft: 16 }}>
        <Terreng
          vertikaltOverdriv={this.state.vertikaltOverdriv}
          visKontur={this.state.visKontur}
          konturintervall={this.state.konturintervall}
          onUpdateLayerProp={this.handleUpdateLayerProp}
        />
      </div>
    )
  }
}

export default Tweaks
