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
  harFokus: boolean,
  items: Array<Object>,
}

type Props = {
  tittel: string,
  query: string,
  onClick: Function,
  onQueryChange: Function,
  harFokus: Boolean,
  isAtRoot: Boolean,
  onToggleMainDrawer: Function,
  onExitToRoot: Function,
  classes: Object,
  children: Object,
}

class TopBar extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      harFokus: false,
      items: null,
    }
  }

  handleSearchButtonClick = () => {
    this.setState({ harFokus: !this.state.harFokus })
  }

  handleSearchClick = taxonId => {
    this.props.onClick(taxonId)
  }

  handleKeyDown = e => {
    if (e.keyCode === 27) {
      this.handleSearchButtonClick()
    }
  }

  handleSearchResults = items => {
    this.setState({ items })
  }

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
          />
          <IconButton
            onClick={this.handleSearchButtonClick}
            className={classes.lightButton}
          >
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
