import React, { Component } from 'react'
import { ListItem } from 'material-ui/List'
import Nature from 'material-ui/svg-icons/image/nature-people'
import Flag from 'material-ui/svg-icons/content/flag'
import Favorite from 'material-ui/svg-icons/action/favorite'

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
    }
  }

  state = {
    fylke: '',
    kommune: '',
    verneomrade: '',
  }

  render() {
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
  }
}

export default Omrader
