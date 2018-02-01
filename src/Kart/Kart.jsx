import Mapbox from './Mapbox/Mapbox'
import NatureAreaDetails from '../Naturområdedetaljer/NatureAreaDetails'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import React, { Component } from 'react'
import backend from '../backend'
import FilterTree from '../FilterTree/FilterTree'
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
    let localId = ''
    if (
      point.features &&
      point.features[0] &&
      point.features[0].properties &&
      point.features[0].properties.localId
    ) {
      localId = point.features[0].properties.localId
      this.goFetchInfo(localId)
      this.setState({ open: true })
    } else {
      this.setState({
        natureArea: '',
        metadata: '',
      })
    }
    //alert(point.lngLat + "\n" + localId)
  }

  goFetchPointInfo(lngLat) {
    backend.hentPunktInfo(lngLat).then(
      data =>
        this.setState({
          pointInfo: data,
        })
      // alert(JSON.stringify(data))
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
        <div>
          <Mapbox
            {...this.props}
            onClick={this.onClick}
            handleVisibilityChange={this.props.handleVisibilityChange}
            handleColorChange={this.props.handleColorChange}
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
            />
            {/* <FilterTree
              natureAreas={this.state.natureAreas}
              handleCheckChange={this.handleCheckChange}
              isSelected={this.isSelected}
            /> */}
          </Drawer>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Kart
