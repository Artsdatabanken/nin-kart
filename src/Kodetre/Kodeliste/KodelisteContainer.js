import React from 'react'
import Kodeliste from './Kodeliste'
import TopBar from '../../TopBar/TopBar'

class KodelisteContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      kode: props.kode,
      obj: '',
      children: [],
    }
    this.handleDataFetch = props.dataFetchFunction.bind(this)
  }

  componentDidMount() {
    this.handleDataFetch(this.state.kode)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      kode: nextProps.kode,
    })
  }

  render() {
    return (
      <div>
        <TopBar
          onClick={this.props.handleGoBack}
          name={this.props.name}
          parentId={this.state.parentId}
        />
        <Kodeliste
          name={this.props.name}
          items={this.state.children}
          key={this.props.filterCode}
          filterCode={this.props.filterCode}
          filter={this.props.filter}
          onClick={kode => this.handleDataFetch(kode)}
          onCheck={this.props.handleCheckChange}
          isSelected={this.props.isSelected}
        />
        {this.props.filter.map(item => <span key={item}>{item + ','}</span>)}
      </div>
    )
  }
}

export default KodelisteContainer
