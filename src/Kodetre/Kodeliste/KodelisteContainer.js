import React from 'react'
import Kodeliste from './Kodeliste'
import TopBar from '../../TopBar/TopBar'

class KodelisteContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      kode: props.kode,
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
    console.log(this.props.kode)
    return (
      <div>
        <TopBar
          onGoBack={this.props.onGoBack}
          title={this.props.kode}
          parentId={this.state.parentId}
        />
        <Kodeliste
          items={this.state.children}
          key={this.props.filterCode}
          filterCode={this.props.filterCode}
          filter={this.props.filter}
          onClick={kode => this.handleDataFetch(kode)}
          onCheck={this.props.onCheckChange}
          isSelected={this.props.isSelected}
        />
        {this.props.filter.map(item => <span key={item}>{item + ','}</span>)}
      </div>
    )
  }
}

export default KodelisteContainer
