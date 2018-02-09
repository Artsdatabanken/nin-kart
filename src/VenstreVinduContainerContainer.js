import React from 'react'
import VenstreVinduContainer from './VenstreVinduContainer'
import { Route } from 'react-router-dom'

class VenstreVinduContainerContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterCodes: [],
    }

    this.handleCheckChange = this.handleCheckChange.bind(this)
    this.isSelected = this.isSelected.bind(this)
  }

  handleCheckChange = function(event) {
    event.stopPropagation()
    const add = event.target.checked
    const name = event.target.name
    const filtercode = event.target.alt

    console.log(filtercode + ', add: ' + add + ' ' + name)
    this.updateFilter(add, filtercode, name)
  }

  isSelected(selectedIds, nodeId) {
    return this.state[selectedIds].indexOf('' + nodeId) >= 0
  }

  updateTree() {
    // let filter = {
    //     Municipalities: this.state.areaIds,
    //     NatureAreaTypeCodes: this.state.natureAreaIds,
    //     RedlistCategories: this.state.redlistCategoryIds,
    // };
    //this.goFetch(filter)
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

  render() {
    return (
      <Route
        render={({ history }) => (
          <VenstreVinduContainer
            filterCode={'filterCodes'}
            mapbounds={this.props.mapbounds}
            onToggleMainDrawer={this.props.onToggleMainDrawer}
            onCheckChange={this.handleCheckChange}
            isSelected={this.isSelected}
            filter={this.state.filterCodes}
          />
        )}
      />
    )
  }
}
export default VenstreVinduContainerContainer
