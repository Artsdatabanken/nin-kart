import Mapbox from './Mapbox/Mapbox'
import NatureAreaDetails from '../Naturområdedetaljer/NatureAreaDetails'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import React, { Component } from 'react'
import backend from '../backend'
//import FilterTree from '../FilterTree/FilterTree'
import CloseIcon from 'material-ui/svg-icons/content/clear'

class Kart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // filter:
      natureAreaIds: [],
      redlistThemeIds: [],

      // api-received data
      areaItems: '',
      redlistTheme: '',

      natureArea: '',
      natureAreas: '',
      metadata: '',
      open: false,
      pointInfo: {},
      admEnhetInfo: '',
      lngLat: null,
      stedsnavnInfo: null,
    }

    this.isSelected = this.isSelected.bind(this)
    this.handleCheckChange = this.handleCheckChange.bind(this)
  }
  componentDidMount() {
    this.updateTree()
  }

  updateTree() {
    let filter = {
      // NatureAreaTypeCodes: this.state.natureAreaIds,
    }

    this.goFetch(filter)
  }

  onClick = point => {
    this.goFetchPointInfo(point.lngLat)
    this.setState({
      lngLat: {
        Lat: { value: Number.parseFloat(point.lngLat[1]).toPrecision(7) },
        Lon: { value: Number.parseFloat(point.lngLat[0]).toPrecision(7) },
      },
      open: true,
    })
    let localId = ''
    if (
      point.features &&
      point.features[0] &&
      point.features[0].properties &&
      point.features[0].properties.localId
    ) {
      localId = point.features[0].properties.localId
      this.goFetchInfo(localId)
    } else {
      this.setState({
        natureArea: '',
        metadata: '',
      })
    }
    //alert(point.lngLat + "\n" + localId)
  }

  fixAdmEnhet(data) {
    if (!data.match(/fylkesnavn = '(.*)'/)) return null
    return {
      Fylkesnavn: {
        value: data.match(/fylkesnavn = '(.*)'/)[1],
      },
      Fylkesnummer: {
        value: data.match(/fylkesnummer = '(.*)'/)[1],
      },
      Kommunenavn: {
        value: data.match(/navn_norsk = '(.*)'/)[1],
      },
      Kommunenummer: {
        value: data.match(/kommunenummer = '(.*)'/)[1],
      },
    }
  }

  fixStedsnavn(data) {
    if (data.placename)
      return {
        Stedsnavn: {
          value: data.placename,
        },
      }
    return null
  }

  goFetchPointInfo(lngLat) {
    backend.hentRasterPunktInfo(lngLat).then(data =>
      this.setState({
        pointInfo: data,
      })
    )
    backend.hentAdmEnhetInfo(lngLat).then(data =>
      this.setState({
        admEnhetInfo: this.fixAdmEnhet(data),
      })
    )
    backend.HentStedsnavnInfo(lngLat).then(data =>
      this.setState({
        stedsnavnInfo: this.fixStedsnavn(data),
      })
    )
  }

  goFetchInfo(id) {
    backend.getNatureAreaByLocalId(id).then(data => {
      this.setState({
        natureArea: data,
        localId: '',
      })
    })
    backend.getMetadataByNatureAreaLocalId(id).then(data =>
      this.setState({
        metadata: data,
        localId: '',
      })
    )
  }
  goFetch(filter) {
    // backend.getAreaSummary(filter)
    //     .then(data => {
    //             this.setState({
    //                 areaItems: data
    //             })
    //         }
    //     );
    backend.natureAreaSummary(filter).then(data => {
      this.setState({
        natureAreas: data.natureAreaTypes.children,
      })
    })
  }

  isSelected(selectedIds, nodeId) {
    return this.state[selectedIds].indexOf(nodeId) >= 0
  }

  handleCheckChange(event) {
    const value = event.target.checked
    const name = event.target.name
    const filtercode = event.target.alt

    this.updateFilter(value, filtercode, name)
  }

  updateFilter = (add, type, code) => {
    if (type === undefined) {
      return
    }
    if (add === true) {
      this.setState(
        {
          [type]: [...this.state[type], code],
        },
        () => this.updateTree()
      )
    } else {
      this.setState(
        prevState => ({
          [type]: prevState[type].filter(i => i !== code),
        }),
        () => this.updateTree()
      )
    }
  }

  handleToggle = () => this.setState({ open: !this.state.open })

  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <Mapbox
            {...this.props}
            onClick={this.onClick}
            onVisibilityChange={this.props.onVisibilityChange}
            onColorChange={this.props.onColorChange}
            categories={this.props.categories}
            visibility={this.props.visibility}
            color={this.props.color}
            mapStyle={this.props.mapStyle}
          />
          <Drawer openSecondary={true} open={this.state.open}>
            <MenuItem onClick={this.handleToggle}>
              <CloseIcon />
            </MenuItem>
            <NatureAreaDetails
              natureArea={this.state.natureArea}
              metadata={this.state.metadata}
              pointInfo={this.state.pointInfo}
              admEnhetInfo={this.state.admEnhetInfo}
              lngLat={this.state.lngLat}
              stedsnavnInfo={this.state.stedsnavnInfo}
            />
            {/* <FilterTree
              natureAreas={this.state.natureAreas}
              handleCheckChange={this.handleCheckChange}
              isSelected={this.isSelected}
            /> */}
          </Drawer>
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

export default Kart
