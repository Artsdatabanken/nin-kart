import Mapbox from './Mapbox/Mapbox'
import NatureAreaDetails from '../Naturområdedetaljer/NatureAreaDetails'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import React, { Component } from 'react'
import backend from '../backend'
import FilterTree from '../FilterTree/FilterTree'

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
    }
    //alert(point.lngLat + "\n" + localId)
  }

  goFetchInfo(id) {
    backend.getNatureAreaByLocalId(id).then(data => {
      this.setState({
        natureArea: data,
      })
    })
    backend.getMetadataByNatureAreaLocalId(id).then(data =>
      this.setState({
        metadata: data,
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
            handleToggle={this.handleToggle}
          />
          <Drawer open={this.state.open}>
            <MenuItem onClick={this.handleToggle}>Lukk</MenuItem>
            <NatureAreaDetails
              natureArea={this.state.natureArea}
              metadata={this.state.metadata}
            />
            <FilterTree
              natureAreas={this.state.natureAreas}
              handleCheckChange={this.handleCheckChange}
              isSelected={this.isSelected}
            />
          </Drawer>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Kart
