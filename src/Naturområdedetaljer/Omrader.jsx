import { ListItem } from '@material-ui/core/List'
import Favorite from '@material-ui/icons/action/favorite'
import Flag from '@material-ui/icons/content/flag'
import Nature from '@material-ui/icons/image/nature-people'
import React, { Component } from 'react'

class Omrader extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.areas) {
      for (let j = 0; j < nextProps.areas.length; j++) {
        let area = nextProps.areas[j]
        switch (area.type) {
          case 2:
            this.setState({ fylke: area.name })
            break
          case 1:
            this.setState({ kommune: area.name })
            break
          case 3:
            this.setState({ verneomrade: area.name })

            // if (area.code && area.code.indexOf("Naturbase ") === 0 ) {
            //     vm.conservationAreaCode(config.factSheetBaseUrl + area.code.substr(10));
            // }

            break
          default:
            break
        }
      }
    } else {
      this.setState({
        fylke: null,
        kommune: null,
        verneomrade: null,
      })
    }
  }

  state = {
    fylke: '',
    kommune: '',
    verneomrade: '',
  }

  render() {
    if (this.state.fylke && this.state.kommune && this.state.verneomrade)
      return (
        <div>
          <ListItem
            primaryText={this.state.fylke}
            secondaryText="Fylke"
            leftIcon={<Flag />}
          />
          <ListItem
            primaryText={this.state.kommune}
            secondaryText="Kommune"
            leftIcon={<Nature />}
          />
          <ListItem
            primaryText={this.state.verneomrade}
            secondaryText="Verneområde"
            leftIcon={<Favorite />}
          />
        </div>
      )
    return <div />
  }
}

export default Omrader
