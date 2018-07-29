import { AppBar, Toolbar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import NavigationBack from '@material-ui/icons/ArrowBack'
import CloseIcon from '@material-ui/icons/Close'
import Hamburger from '@material-ui/icons/Menu'
import Search from '@material-ui/icons/Search'
import React, { Component } from 'react'
import SearchBox from '../SearchBox/SearchBox'

const styles = {
  root: {
    position: 'absolute',
    left: 8,
    top: 8,
    width: 392,
    backgroundColor: '#fff',
  },
  toolbar: {
    padding: 0,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

class TopBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchHasFocus: false,
    }
  }

  handleSearchButtonClick = () => {
    this.setState({ searchHasFocus: !this.state.searchHasFocus })
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
            <IconButton onClick={this.props.onToggleMainDrawer}>
              <Hamburger />
            </IconButton>
          ) : (
            <IconButton onClick={this.props.onGoBack}>
              <NavigationBack />
            </IconButton>
          )}
          <SearchBox
            query={this.props.query}
            tittel={this.props.tittel}
            onQueryChange={this.props.onQueryChange}
          />
          <IconButton onClick={this.handleSearchButtonClick}>
            <Search color="#b4b4b4" />
          </IconButton>
          {!this.props.isAtRoot && (
            <IconButton
              onClick={this.props.onExitToRoot}
              style={{ position: 'relative' }}
            >
              <CloseIcon color="#b4b4b4" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(TopBar)
