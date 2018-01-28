import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Search from 'material-ui/svg-icons/action/search'
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import Hamburger from 'material-ui/svg-icons/navigation/menu'
import FinnKode from '../FinnKode/FinnKode'

class TopBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearchField: false,
    }
  }

  handleSearchButtonClick = () => {
    this.setState({ showSearchField: !this.state.showSearchField })
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
      <div>
        <AppBar
          style={{ backgroundColor: '#ffffff' }}
          title={
            true || this.state.showSearchField ? (
              <FinnKode
                onSearchResults={this.props.onSearchResults}
                onBlur={() => this.setState({ showSearchField: false })}
              />
            ) : (
              this.props.title
            )
          }
          iconElementLeft={
            this.props.showKodeListe ? (
              <IconButton onClick={this.props.onGoBack}>
                <NavigationBack />
              </IconButton>
            ) : (
              <IconButton onClick={this.props.onMainMenu}>
                <Hamburger color="#5f5f5f" />
              </IconButton>
            )
          }
          iconElementRight={
            <React.Fragment>
              <IconButton onClick={this.handleSearchButtonClick}>
                <Search color="#b4b4b4" />
              </IconButton>
              {this.props.showKodeListe && (
                <IconButton onClick={this.props.toggleShowKodeListe}>
                  <CloseIcon color="#b4b4b4" />
                </IconButton>
              )}
            </React.Fragment>
          }
        />
      </div>
    )
  }
}

export default TopBar
