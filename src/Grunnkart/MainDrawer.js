import React, { Component } from 'react'
import { IconButton, ListItem, Drawer, MenuItem } from 'material-ui'
import muiThemeable from 'material-ui/styles/muiThemeable'
import NavigationChevronLeftDouble from './NavigationChevronLeftDouble'
class MainDrawer extends Component {
  render() {
    return (
      <Drawer
        docked={false}
        open={this.props.open}
        onRequestChange={open => this.props.onToggleMainDrawer(open)}
        style={{ paddingLeft: 32 }}
      >
        <ListItem
          style={{ borderBottom: '1px solid ' }}
          leftAvatar={
            <img
              alt="logo"
              style={{ height: '38px' }}
              src="https://pbs.twimg.com/profile_images/882873307133083648/_1-mmxih_400x400.jpg"
            />
          }
          primaryText={
            <span style={{ fontSize: 20, fontWeight: 500 }}>Grunnkartet</span>
          }
          rightIcon={
            <IconButton onClick={this.props.onToggleMainDrawer}>
              <NavigationChevronLeftDouble
                viewBox="0 0 28 28"
                color={this.props.muiTheme.palette.disabledColor}
              />
            </IconButton>
          }
          disabled
        />
        <MenuItem
          onClick={() => {
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
        <hr />
        <MenuItem>Del eller bygg inn kartet</MenuItem>
        <MenuItem>Skriv ut</MenuItem>
        <MenuItem>Send tilbakemeldinger</MenuItem>
        <hr />
        <MenuItem>Søkeinnstillinger</MenuItem>
      </Drawer>
    )
  }
}
export default muiThemeable()(MainDrawer)
