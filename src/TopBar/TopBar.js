import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Search from 'material-ui/svg-icons/action/search'
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back'
import MoreVert from 'material-ui/svg-icons/navigation/more-vert'

class TopBar extends Component {
  render() {
    return (
      <div>
        <AppBar
          title={this.props.title}
          iconElementLeft={
            <IconButton onClick={this.props.onGoBack}>
              <NavigationBack />
            </IconButton>
          }
          iconElementRight={
            <React.Fragment>
              <IconButton>
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
