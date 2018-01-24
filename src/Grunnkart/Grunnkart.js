import React, { Component } from 'react'
import Kart from '../Kart/Kart'
import Kode from '../Kodetre/Kode'
import Popover from 'material-ui/Popover'

class Grunnkart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      kode: '',
      open: false,
    }

    this.handleShowKodetre = this.handleShowKodetre.bind(this)
    this.handleAddLayer = this.handleAddLayer.bind(this)
  }

  handleShowKodetre = event => {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  handleAddLayer(kode) {
    this.setState({
      kode: kode,
    })
    console.log(kode)
  }

  render() {
    return (
      <div>
        <Kart
          latitude={63}
          longitude={10}
          zoom={4}
          handleShowKodetre={this.handleShowKodetre}
        />

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Kode
            kode={this.props.match.params.kode}
            history={this.props.history}
            onAddLayer={this.handleAddLayer}
          />
        </Popover>
      </div>
    )
  }
}

export default Grunnkart
