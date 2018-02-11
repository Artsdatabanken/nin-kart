import React from 'react'
import VenstreVinduContainer from './VenstreVinduContainer'
import { Route } from 'react-router-dom'

class VenstreVinduContainerContainer extends React.Component {
  render() {
    return (
      <Route
        render={({ history }) => (
          <VenstreVinduContainer
            mapbounds={this.props.mapbounds}
            onToggleMainDrawer={this.props.onToggleMainDrawer}
          />
        )}
      />
    )
  }
}
export default VenstreVinduContainerContainer
