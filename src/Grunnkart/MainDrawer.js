import {
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  SwipeableDrawer,
  Switch,
} from '@material-ui/core'
import { withStyles, withTheme } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import { Layers, Map } from '@material-ui/icons'
import { PropTypes } from 'prop-types'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import BildeAvatar from '../Kodetre/Kodeliste/Bildeavatar'
import NavigationChevronLeftDouble from './NavigationChevronLeftDouble'

const GitHub = props => {
  return (
    <SvgIcon style={{ fill: 'hsla(0, 0%, 0%, 0.54)' }}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
    </SvgIcon>
  )
}

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
          <ListSubheader>Innstillinger</ListSubheader>
          <ListItem
            button
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              onUpdateSetting('visKoder', !visKoder)
            }}
          >
            <ListItemIcon>
              <span
                style={
                  visKoder
                    ? { fontWeight: 700 }
                    : {
                        fontWeight: 700,
                        textDecoration: 'line-through',
                      }
                }
              >
                NA
              </span>
            </ListItemIcon>
            <ListItemText primary="Vis kryptiske koder" />
            <Switch checked={visKoder} />
          </ListItem>
          <Divider />
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
