import React, { Component } from 'react'
import Kart from '../Kart/Kart'
import MainDrawer from './MainDrawer'
import { FloatingActionButton } from 'material-ui'
import MapsLayers from 'material-ui/svg-icons/maps/layers'
import KatalogIkon from 'material-ui/svg-icons/communication/import-contacts'
import { Link } from 'react-router-dom'
import {
  defaultMapStyle,
  darkMapStyle,
  vintageMapStyle,
  satelliteStyle,
  Kalk,
  Ultramafisk,
  Seksjoner,
  Soner,
  NiN,
  Rodliste,
  NiNHover,
} from '../Kart/Mapbox/MapStyle'
import VenstreVinduContainerContainer from '../VenstreVinduContainerContainer'

// Layer color class by type
const colorClass = {
  line: 'line-color',
  fill: 'fill-color',
  background: 'background-color',
  symbol: 'text-color',
}

class Grunnkart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      baseMapStyle: defaultMapStyle,
      mapStyle: '',
      showMainDrawer: false,
      categories: [
        'Alle naturområder',
        'Rødlistede',
        'Bioklimatiske soner',
        'Seksjoner',
        'Ultramafisk',
        'Kalk',
      ],
      visibility: {
        'Alle naturområder': true,
        Rødlistede: false,
        'Bioklimatiske soner': false,
        Seksjoner: false,
        Ultramafisk: false,
        Kalk: false,
      },
      color: {
        'Alle naturområder': undefined,
        Rødlistede: undefined,
        'Bioklimatiske soner': undefined,
        Seksjoner: undefined,
        Ultramafisk: undefined,
        Kalk: undefined,
      },
      // Layer id patterns by category
      layerSelector: {
        'Alle naturområder': /nin/,
        Rødlistede: /Rodlistede/,
        'Bioklimatiske soner': /soner/,
        Seksjoner: /seksjoner/,
        Ultramafisk: /ultramafisk/,
        Kalk: /kalk/,
      },
    }

    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
    this.handleChangeBaseMap = this.handleChangeBaseMap.bind(this)
  }

  handleColorChange(name, event) {
    const color = { ...this.state.color, [name]: event.target.value }
    this.setState({ color })
    this.updateMapStyle({ ...this.state, color })
  }

  handleVisibilityChange(name, visible) {
    const visibility = {
      ...this.state.visibility,
      [name]: visible,
    }
    this.setState({ visibility })
    this.updateMapStyle({ ...this.state, visibility })
  }

  updateMapStyle({ visibility, color, layerSelector }) {
    const layers = this.layers

      .filter(layer => {
        const id = layer.get('id')
        return this.state.categories.every(
          name => visibility[name] || !layerSelector[name].test(id)
        )
      })
      .map(layer => {
        const id = layer.get('id')
        const type = layer.get('type')
        const category = this.state.categories.find(name =>
          layerSelector[name].test(id)
        )
        if (category && colorClass[type] && color[category]) {
          return layer.setIn(['paint', colorClass[type]], color[category])
        }
        return layer
      })

    this.setState({ mapStyle: this.state.baseMapStyle.set('layers', layers) })
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
        this.updateMapStyle({ ...this.state })
      }
    )
  }

  addCustomLayers() {
    this.layers = this.state.baseMapStyle
      .get('layers')
      .push(Kalk)
      .push(Ultramafisk)
      .push(Seksjoner)
      .push(Soner)
      .push(NiN)
      .push(Rodliste)
      .push(NiNHover)
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
        {false && (
          <Link to="/kontrollpanel">
            <FloatingActionButton
              style={{ position: 'absolute', bottom: 48, right: 48 }}
            >
              <MapsLayers />
            </FloatingActionButton>
          </Link>
        )}
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
              onVisibilityChange={this.handleVisibilityChange}
              onColorChange={this.handleColorChange}
              categories={this.state.categories}
              visibility={this.state.visibility}
              mapbounds={this.state.mapbounds}
              color={this.state.color}
            />
          </div>
        )}
      </div>
    )
  }
}

export default Grunnkart
