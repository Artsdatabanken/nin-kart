import React, { Component } from 'react'
import { Drawer, MenuItem } from 'material-ui'

class MainDrawer extends Component {
  render() {
    return (
      <Drawer
        docked={false}
        open={this.props.open}
        onRequestChange={this.props.onToggleMainDrawer}
      >
        <MenuItem
          onClick={() => {
            this.props.handleChangeBaseMap('')
          }}
        >
          Basiskart
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.props.handleChangeBaseMap('dark')
          }}
        >
          Basiskart - Mørk
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.props.handleChangeBaseMap('vintage')
          }}
        >
          Basiskart - Gammel
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.props.handleChangeBaseMap('satellite')
          }}
        >
          Flyfoto
        </MenuItem>
        <MenuItem>Aktive kartlag</MenuItem>
        <MenuItem>Del eller bygg inn kartet</MenuItem>
        <MenuItem>Skriv ut</MenuItem>
        <MenuItem>Send tilbakemeldinger</MenuItem>
        <MenuItem>Søkeinnstillinger</MenuItem>
      </Drawer>
    )
  }
}

export default MainDrawer
