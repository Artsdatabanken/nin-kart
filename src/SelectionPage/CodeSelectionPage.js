import React from 'react'
import DigDownCodeListContainer from '../DigDownCodeList/DigDownCodeListContainer'
import backend from '../backend'

class CodeSelectionPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // code: "Root",

      // filter:
      filterCodes: [],
    }

    // this.handleDataFetch = this.taxonFetch.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this)
    this.isSelected = this.isSelected.bind(this)
    this.handleGoToCode = this.handleGoToCode.bind(this)
    this.handleGoBack = this.handleGoBack.bind(this)
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

  handleGoToCode(code) {
    this.props.history.push(`/select/${code}`)
  }
  handleGoBack() {
    this.props.history.goBack()
  }
  // componentWillReceiveProps(nextProps) {
  //     this.setState({code: nextProps.match.params.code});
  // }

  codeCount = function(code) {
    this.props.handleGoToCode(code)
    backend.codeNameCount(code).then(data =>
      this.setState({
        obj: data,
        children: data,
        parentId: 'Root',
        id: code,
      })
    )
  }

  render() {
    return (
      <div>
        <DigDownCodeListContainer
          name={'Tilgjengelige lag'}
          filterCode={'filterCodes'}
          id={this.props.match.params.code}
          //id={this.state.code}
          dataFetchFunction={this.codeCount}
          handleGoToCode={this.handleGoToCode}
          handleGoBack={this.handleGoBack}
          handleCheckChange={this.handleCheckChange}
          isSelected={this.isSelected}
          filter={this.state.filterCodes}
        />
      </div>
    )
  }
}

export default CodeSelectionPage
