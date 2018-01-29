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
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Drawer>
    )
  }
}

export default MainDrawer
