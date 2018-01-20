import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Search from 'material-ui/svg-icons/action/search'
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back'
import MoreVert from 'material-ui/svg-icons/navigation/more-vert'
import FlatButton from 'material-ui/FlatButton'

class TopBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name,
      parent: props.parentId,
      handleClick: props.onClick,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      parent: nextProps.parentId,
    })
  }

  render() {
    return (
      <div>
        <AppBar
          title={this.state.name}
          iconElementLeft={
            <IconButton onClick={() => this.props.onClick(this.state.parent)}>
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
