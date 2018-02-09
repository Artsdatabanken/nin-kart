import React, { Component } from 'react'
import Kart from '../Kart/Kart'
import MainDrawer from './MainDrawer'
import { FloatingActionButton } from 'material-ui'
import KatalogIkon from 'material-ui/svg-icons/communication/import-contacts'
import { Link } from 'react-router-dom'
import {
  defaultMapStyle,
  darkMapStyle,
  vintageMapStyle,
  satelliteStyle,
  NiN,
  NiNHover,
} from '../Kart/Mapbox/MapStyle'
import VenstreVinduContainerContainer from '../VenstreVinduContainerContainer'

class Grunnkart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      baseMapStyle: defaultMapStyle,
      mapStyle: '',
      showMainDrawer: false,
    }

    this.handleChangeBaseMap = this.handleChangeBaseMap.bind(this)
  }

  handleChangeBaseMap(type) {
    let newStyle = defaultMapStyle
    switch (type) {
      case 'dark': {
        newStyle = darkMapStyle
        break
      }
      case 'vintage': {
        newStyle = vintageMapStyle
        break
      }
      case 'satellite': {
        newStyle = satelliteStyle
        break
      }
      default: {
        break
      }
    }
    this.setState(
      {
        baseMapStyle: newStyle,
      },
      () => {
        this.addCustomLayers()
      }
    )
  }

  addCustomLayers() {
    this.layers = this.state.baseMapStyle
      .get('layers')
      .push(NiN)
      .push(NiNHover)
    this.setState({
      mapStyle: this.state.baseMapStyle.set('layers', this.layers),
    })
  }

  componentDidMount() {
    this.handleChangeBaseMap()
  }

  render() {
    return (
      <div>
        <Kart
          latitude={65.5}
          longitude={10}
          zoom={4.7}
          mapStyle={this.state.mapStyle}
          onMapBoundsChange={bounds => {
            this.setState({ mapbounds: bounds })
          }}
        />

        <MainDrawer
          handleChangeBaseMap={this.handleChangeBaseMap}
          open={this.state.showMainDrawer}
          onToggleMainDrawer={() =>
            this.setState({ showMainDrawer: !this.state.showMainDrawer })
          }
        />
        <Link to="/katalog">
          <FloatingActionButton
            style={{ position: 'absolute', bottom: 48, left: 48 }}
          >
            <KatalogIkon />
          </FloatingActionButton>
        </Link>
        {!this.state.showMainDrawer && (
          <div
            style={{
              backgroundColor: '#fff',
              position: 'absolute',
              left: 8,
              top: 10,
              width: 400,
              zIndex: 2,
            }}
          >
            <VenstreVinduContainerContainer
              onToggleMainDrawer={() =>
                this.setState({ showMainDrawer: !this.state.showMainDrawer })
              }
              mapbounds={this.state.mapbounds}
            />
          </div>
        )}
      </div>
    )
  }
}

export default Grunnkart
