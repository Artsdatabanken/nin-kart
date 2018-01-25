import React, { Component } from 'react'
import Kart from '../Kart/Kart'
import Kode from '../Kodetre/Kode'
import { IconButton, Paper, AppBar } from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import { fromJS } from 'immutable'
import MAP_STYLE from '../Kart/style.json'

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
      mapStyle: '',
      kode: '',
      open: true,
      newLayer: '',
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

    this.handleShowKodetre = this.handleShowKodetre.bind(this)
    this.handleAddLayer = this.handleAddLayer.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
    this.startUpdateMapStyle = this.startUpdateMapStyle.bind(this)
    this.handleStyleChange = this.handleStyleChange.bind(this)
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

  handleShowKodetre = event => {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  handleAddLayer(kode) {
    this.setState({
      kode: kode,
      newLayer: kode,
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
        <AppBar
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            width: 500,
          }}
        >
          <IconButton
            onClick={this.handleMenu}
            color="inherit"
            style={{ top: 8 }}
          >
            <ActionSearch />
          </IconButton>
        </AppBar>
        <Kart
          latitude={65.5}
          longitude={10}
          zoom={4.7}
          handleShowKodetre={this.handleShowKodetre}
          handleVisibilityChange={this.handleVisibilityChange}
          handleColorChange={this.handleColorChange}
          newLayer={this.state.newLayer}
          categories={this.state.categories}
          visibility={this.state.visibility}
          color={this.state.color}
          layerSelector={this.state.layerSelector}
          defaultMapStyle={defaultMapStyle}
          mapStyle={this.state.mapStyle}
          handleStyleChange={this.handleStyleChange}
        />
        {this.state.open && (
          <Paper
            zDepth={3}
            style={{
              position: 'absolute',
              left: 8,
              top: 80,
            }}
          >
            <Kode
              kode={this.props.match.params.kode}
              history={this.props.history}
              onAddLayer={this.handleAddLayer}
            />
          </Paper>
        )}
      </div>
    )
  }
}

export default Grunnkart
