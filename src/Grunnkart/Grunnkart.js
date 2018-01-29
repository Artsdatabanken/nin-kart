import React, { Component } from 'react'
import Kart from '../Kart/Kart'
import Kode from '../Kodetre/Kode'
import { fromJS } from 'immutable'
import MAP_STYLE from '../Kart/style.json'
import MainDrawer from './MainDrawer'
const defaultMapStyle = fromJS(MAP_STYLE)

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
      showKodeListe: false,
      mapStyle: '',
      kode: '',
      open: true,
      showMainDrawer: false,
      categories: [
        'Kalk',
        'Alle naturområder',
        'Rødlistede',
        'Bioklimatiske soner',
        'Seksjoner',
        'Ultramafisk',
      ],
      visibility: {
        Kalk: false,
        'Alle naturområder': false,
        Rødlistede: false,
        'Bioklimatiske soner': false,
        Seksjoner: false,
        Ultramafisk: false,
      },
      color: {
        kalk: undefined,
        'Alle naturområder': undefined,
        Rødlistede: undefined,
        'Bioklimatiske soner': undefined,
        Seksjoner: undefined,
        Ultramafisk: undefined,
      },
      // Layer id patterns by category
      layerSelector: {
        Kalk: /ngu-kalk/,
        'Alle naturområder': /nin/,
        Rødlistede: /Rodlistede/,
        'Bioklimatiske soner': /soner2017-4326-6fcqhb/,
        Seksjoner: /seksjoner2017-4326-c6e9g5/,
        Ultramafisk: /ultramafisk/,
      },
    }

    this.handleAddLayer = this.handleAddLayer.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
    this.handleToggleShowKodeListe = this.handleToggleShowKodeListe.bind(this)
  }

  makeLayer(name, code, visibel, source) {
    const color = { ...this.state.color, [name]: '#003399' }
    const visibility = { ...this.state.visibility, [name]: visibel }
    const layerSelector = {
      ...this.state.layerSelector,
      [name]: new RegExp(code),
    }
    const categories = [...this.state.categories, ...[name]]
    this.setState({ categories, visibility, color, layerSelector })

    return fromJS({
      id: code,
      type: 'fill',
      metadata: {
        'mapbox:group': 'f687f11d778ea9a47615d3f139a85ec5',
      },
      source: 'composite',
      'source-layer': source,
      interactive: true,
      filter: ['has', code],
      layout: {},
      paint: {
        'fill-color': 'hsla(251, 59%, 28%, 0.8)',
        'fill-outline-color': 'hsla(251, 59%, 69%, 0.8)',
      },
    })
  }

  addLayer(code) {
    this._defaultLayers = this._defaultLayers.push(
      this.makeLayer(code, code, true, 'naturomrader6')
    )
    this.updateMapStyle({ ...this.state })
  }

  handleStyleChange = mapStyle => {
    this.setState({ mapStyle })
  }

  handleColorChange(name, event) {
    const color = { ...this.state.color, [name]: event.target.value }
    this.setState({ color })
    this.updateMapStyle({ ...this.state, color })
  }

  handleVisibilityChange(name, event) {
    const visibility = {
      ...this.state.visibility,
      [name]: event.target.checked,
    }
    this.setState({ visibility })
    this.updateMapStyle({ ...this.state, visibility })
  }

  handleToggleShowKodeListe() {
    this.setState({ showKodeListe: !this.state.showKodeListe })
  }

  startUpdateMapStyle() {
    this.updateMapStyle({ ...this.state })
  }

  updateMapStyle({ visibility, color, layerSelector }) {
    const layers = this._defaultLayers

      .filter(layer => {
        const id = layer.get('id')
        //console.log(id);
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

    this.handleStyleChange(defaultMapStyle.set('layers', layers))
  }

  handleAddLayer(kode) {
    this.setState({
      kode: kode,
    })
    this.addLayer(kode)
    console.log(kode)
  }

  componentDidMount() {
    this._defaultLayers = defaultMapStyle.get('layers')
    this.updateMapStyle({ ...this.state })
  }

  render() {
    return (
      <div>
        <Kart
          latitude={65.5}
          longitude={10}
          zoom={4.7}
          handleVisibilityChange={this.handleVisibilityChange}
          handleColorChange={this.handleColorChange}
          categories={this.state.categories}
          visibility={this.state.visibility}
          color={this.state.color}
          mapStyle={this.state.mapStyle}
        />
        <MainDrawer
          open={this.state.showMainDrawer}
          onToggleMainDrawer={() =>
            this.setState({ showMainDrawer: !this.state.showMainDrawer })
          }
        />
        {this.state.open &&
          !this.state.showMainDrawer && (
            <div
              style={{
                backgroundColor: 'red',
                position: 'absolute',
                left: 8,
                top: 10,
                width: 400,
              }}
            >
              <Kode
                kode={this.props.match.params.kode}
                history={this.props.history}
                onAddLayer={this.handleAddLayer}
                onToggleShowKodeListe={this.handleToggleShowKodeListe}
                onToggleMainDrawer={() =>
                  this.setState({ showMainDrawer: !this.state.showMainDrawer })
                }
                showKodeListe={this.state.showKodeListe}
              />
            </div>
          )}
      </div>
    )
  }
}

export default Grunnkart
