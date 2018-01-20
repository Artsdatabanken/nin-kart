import React from 'react'
import DigDownList from './DigDownCodeList'
import TopBar from '../TopBar/TopBar'

class DigDownCodeListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      obj: '',
      children: [],
    }
    this.handleDataFetch = props.dataFetchFunction.bind(this)
  }

  componentDidMount() {
    this.handleDataFetch(this.state.id)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.id,
    })
    //this.handleDataFetch(this.state.id);
  }

  render() {
    return (
      <div>
        <TopBar
          onClick={this.props.handleGoBack}
          name={this.props.name}
          parentId={this.state.parentId}
        />
        <DigDownList
          name={this.props.name}
          items={this.state.children}
          key={this.props.filterCode}
          filterCode={this.props.filterCode}
          filter={this.props.filter}
          onClick={id => this.handleDataFetch(id)}
          onCheck={this.props.handleCheckChange}
          isSelected={this.props.isSelected}
        />
        {this.props.filter.map(item => <span key={item}>{item + ','}</span>)}
      </div>
    )
  }
}

export default DigDownCodeListContainer
