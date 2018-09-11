import {
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  SwipeableDrawer,
} from '@material-ui/core'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { Layers, Map } from '@material-ui/icons'
import { PropTypes } from 'prop-types'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import NavigationChevronLeftDouble from '../Grunnkart/NavigationChevronLeftDouble'
import BildeAvatar from '../Kodetre/Kodeliste/Bildeavatar'
import GitHub from './GitHub'
import Innstillinger from './Innstillinger'

const styles = {
  link: { cursor: 'pointer' },
}

class MainDrawer extends Component {
  render() {
    const {
      classes,
      erÅpen,
      toggleDrawer,
      history,
      visKoder,
      sorterPåKode,
      onUpdateSetting,
    } = this.props
    return (
      <SwipeableDrawer
        anchor="left"
        open={erÅpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <ListItem>
          <div
            className={classes.link}
            onClick={() => {
              window.open('https://artsdatabanken.no/Pages/3')
            }}
          >
            <BildeAvatar kode="OR_AD" utenRamme />
          </div>
          <ListItemText primary="Natur i Norge" />
          <IconButton onClick={toggleDrawer}>
            <NavigationChevronLeftDouble />
          </IconButton>
        </ListItem>
        <div
          tabIndex={0}
          role="button"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <ListItem onClick={() => history.push('/')} button>
            <ListItemIcon>
              <Map />
            </ListItemIcon>
            <ListItemText primary="Mine kartlag" />
          </ListItem>
          <ListItem onClick={() => history.push('/katalog/')} button>
            <ListItemIcon>
              <Layers />
            </ListItemIcon>
            <ListItemText primary="Kartkatalog" />
          </ListItem>
          <Divider />
          <Innstillinger
            visKoder={visKoder}
            sorterPåKode={sorterPåKode}
            onUpdateSetting={onUpdateSetting}
          />
          <Divider />
          <ListSubheader>Bidra</ListSubheader>
          <ListItem
            onClick={() => {
              window.open(
                'https://github.com/Artsdatabanken/ratatouille/issues'
              )
            }}
            button
          >
            <ListItemIcon>
              <GitHub />
            </ListItemIcon>
            <ListItemText primary="Send tilbakemeldinger" />
          </ListItem>
          <MenuItem />
        </div>
      </SwipeableDrawer>
    )
  }
}

MainDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  onUpdateSetting: PropTypes.func.isRequired,
}

export default withRouter(withStyles(styles)(withTheme()(MainDrawer)))
