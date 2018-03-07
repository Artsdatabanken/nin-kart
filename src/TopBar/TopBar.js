import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Search from 'material-ui/svg-icons/action/search'
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import Hamburger from 'material-ui/svg-icons/navigation/menu'
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
