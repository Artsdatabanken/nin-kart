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
        <MenuItem>Basiskart</MenuItem>
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
