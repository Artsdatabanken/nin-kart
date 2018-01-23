import React, { Component } from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import getNext from '../componentid'
import backend from '../backend'

const dataSourceConfig = {
  text: 'ScientificName',
  value: 'Id',
}

export default class FinnKode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
    }
  }

  handleSelection = (chosenRequest, index) => {
    this.props.onClick(chosenRequest.Id)
  }

  handleUpdateInput = searchStr => {
    backend.searchTaxons(searchStr).then(items =>
      this.setState({
        dataSource: items,
      })
    )
  }

  render() {
    return (
      <AutoComplete
        inputStyle={{ color: 'white' }}
        floatingLabelStyle={{ color: 'white' }}
        hintStyle={{ color: 'white' }}
        autoFocus
        id={getNext()}
        hintText="Søk på alt mulig"
        filter={AutoComplete.caseInsensitiveFilter}
        dataSource={this.state.dataSource}
        dataSourceConfig={dataSourceConfig}
        onUpdateInput={this.handleUpdateInput}
        onNewRequest={this.handleSelection}
        onKeyDown={this.props.onKeyDown}
        onClose={this.props.onAbort}
        floatingLabelText="Fritekstsøk"
        fullWidth={true}
      />
    )
  }
}
