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
      classes: props.classes,
      taxon: props.taxon,
      showSearch: false,
    }
  }

  handleSearchButtonClick = () => {
    this.setState({ showSearch: !this.state.showSearch })
  }

  handleSearchClick = taxonId => {
    this.props.onClick(taxonId)
  }

  handleKeyDown = e => {
    if (e.keyCode === 27) {
      this.handleSearchButtonClick()
    }
  }

  render() {
    return (
      <div>
        <AppBar
          title={
            this.state.showSearch ? (
              <FinnKode
                onClick={this.handleSearchClick}
                onAbort={this.handleSearchButtonClick}
                onKeyDown={this.handleKeyDown}
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
                <Search color="#ffffff" />
              </IconButton>
              <IconButton>
                <MoreVert color="#ffffff" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    )
  }
}

export default TopBar
