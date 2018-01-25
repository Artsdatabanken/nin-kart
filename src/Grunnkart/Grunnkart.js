import React, { Component } from 'react'
import Kart from '../Kart/Kart'
import Kode from '../Kodetre/Kode'
import { IconButton, Paper, AppBar } from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'

class Grunnkart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      kode: '',
      open: true,
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
        <AppBar
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            width: 500,
          }}
        >
          <IconButton
            onClick={this.handleMenu}
            color="inherit"
            style={{ top: 8 }}
          >
            <ActionSearch />
          </IconButton>
        </AppBar>
        <Kart
          latitude={65.5}
          longitude={10}
          zoom={4.7}
          onShowKodetre={this.handleShowKodetre}
        />
        {this.state.open && (
          <Paper
            zDepth={3}
            style={{
              position: 'absolute',
              left: 8,
              top: 80,
            }}
          >
            <Kode
              kode={this.props.match.params.kode}
              history={this.props.history}
              onAddLayer={this.handleAddLayer}
            />
          </Paper>
        )}
      </div>
    )
  }
}

export default Grunnkart
