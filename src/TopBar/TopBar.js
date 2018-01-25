import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Search from 'material-ui/svg-icons/action/search'
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back'
import MoreVert from 'material-ui/svg-icons/navigation/more-vert'
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
          title={
            this.state.showSearchField ? (
              <FinnKode
                onSearchResults={this.props.onSearchResults}
                onBlur={() => this.setState({ showSearchField: false })}
              />
            ) : (
              this.props.title
            )
          }
          iconElementLeft={
            <IconButton onClick={this.props.onGoBack}>
              <NavigationBack />
            </IconButton>
          }
          iconElementRight={
            <React.Fragment>
              <IconButton onClick={this.handleSearchButtonClick}>
                <Search />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    )
  }
}

export default TopBar
