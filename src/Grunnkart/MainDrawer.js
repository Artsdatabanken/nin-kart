import React, { Component } from 'react'
import { Drawer, MenuItem } from 'material-ui'
import { Link } from 'react-router-dom'

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
            this.props.onToggleMainDrawer()
            this.props.handleChangeBaseMap('')
          }}
        >
          Basiskart
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.props.onToggleMainDrawer()
            this.props.handleChangeBaseMap('dark')
          }}
        >
          Basiskart - Mørk
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.props.onToggleMainDrawer()
            this.props.handleChangeBaseMap('vintage')
          }}
        >
          Basiskart - Gammel
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.props.onToggleMainDrawer()
            this.props.handleChangeBaseMap('satellite')
          }}
        >
          Flyfoto
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.props.onToggleMainDrawer()
          }}
        >
          <Link to="/kontrollpanel">Aktive kartlag</Link>
        </MenuItem>
        <MenuItem>Del eller bygg inn kartet</MenuItem>
        <MenuItem>Skriv ut</MenuItem>
        <MenuItem>Send tilbakemeldinger</MenuItem>
        <MenuItem>Søkeinnstillinger</MenuItem>
      </Drawer>
    )
  }
}
export default MainDrawer
