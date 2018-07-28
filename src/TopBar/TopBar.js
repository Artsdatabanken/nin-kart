import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Search from '@material-ui/icons/Search'
import NavigationBack from '@material-ui/icons/ArrowBack'
import CloseIcon from '@material-ui/icons/Close'
import Hamburger from '@material-ui/icons/Menu'
import React, { Component } from 'react'
import SearchBox from '../SearchBox/SearchBox'

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
    return (
      <AppBar
        style={{ backgroundColor: '#ffffff' }}
        title={
          <div style={{ lineHeight: '24px' }}>
            <SearchBox
              query={this.props.query}
              tittel={this.props.tittel}
              onQueryChange={this.props.onQueryChange}
            />
          </div>
        }
        iconElementLeft={
          this.props.isAtRoot ? (
            <IconButton onClick={this.props.onToggleMainDrawer}>
              <Hamburger color="#5f5f5f" />
            </IconButton>
          ) : (
            <IconButton onClick={this.props.onGoBack}>
              <NavigationBack color="#5f5f5f" />
            </IconButton>
          )
        }
        iconElementRight={
          <React.Fragment>
            <IconButton onClick={this.handleSearchButtonClick}>
              <Search color="#b4b4b4" />
            </IconButton>
            <IconButton onClick={this.props.invertMinimized}>
              {this.props.minimized ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M5 8l4 4 4-4z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M9 6l-4 4h8z" />
                </svg>
              )}
            </IconButton>
            {!this.props.isAtRoot && (
              <React.Fragment>
                <div
                  style={{
                    position: 'absolute',
                    height: 25,
                    borderLeft: '1px solid #ddd',
                    marginTop: 12,
                    top: 0,
                    right: 55,
                  }}
                />
                <IconButton
                  onClick={this.props.onExitToRoot}
                  style={{ position: 'relative' }}
                >
                  <CloseIcon color="#b4b4b4" />
                </IconButton>
              </React.Fragment>
            )}
          </React.Fragment>
        }
      />
    )
  }
}

export default TopBar
