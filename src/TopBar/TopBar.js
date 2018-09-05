// @flow
import { AppBar, Toolbar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import NavigationBack from '@material-ui/icons/ArrowBack'
import CloseIcon from '@material-ui/icons/Close'
import Hamburger from '@material-ui/icons/Menu'
import Search from '@material-ui/icons/Search'
import React from 'react'
import { withRouter } from 'react-router-dom'
import SearchBox from '../SearchBox/SearchBox'

const styles = {
  root: {
    position: 'fixed',
    left: 8,
    top: 8,
    width: 392,
    backgroundColor: '#fff',
  },
  toolbar: {
    padding: 0,
  },
  darkButton: {
    color: '#616161',
  },
  lightButton: {
    color: '#b4b4b4',
  },
}

type State = {
  items: Array<Object>,
}

type Props = {
  tittel: string,
  query: string,
  onClick: Function,
  onQueryChange: Function,
  isAtRoot: Boolean,
  onToggleMainDrawer: Function,
  onExitToRoot: Function,
  classes: Object,
  children: Object,
}

class TopBar extends React.Component<Props, State> {
  render() {
    const { classes } = this.props
    return (
      <AppBar position="sticky" className={classes.root}>
        <Toolbar variant="dense" className={classes.toolbar}>
          {this.props.isAtRoot ? (
            <IconButton
              onClick={this.props.onToggleMainDrawer}
              className={classes.darkButton}
            >
              <Hamburger />
            </IconButton>
          ) : (
            <IconButton
              onClick={this.props.onGoBack}
              className={classes.darkButton}
            >
              <NavigationBack />
            </IconButton>
          )}
          <SearchBox
            query={this.props.query}
            tittel={this.props.tittel}
            onQueryChange={this.props.onQueryChange}
            onExitToRoot={this.props.onExitToRoot}
            isAtRoot={this.props.isAtRoot}
          />
          <IconButton className={classes.lightButton}>
            <Search />
          </IconButton>
          {!this.props.isAtRoot && (
            <IconButton
              onClick={this.props.onExitToRoot}
              className={classes.lightButton}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Toolbar>
        {this.props.children}
      </AppBar>
    )
  }
}

export default withRouter(withStyles(styles)(TopBar))
