import React from 'react'
import Kodeliste from './Kodeliste'
import TopBar from '../../TopBar/TopBar'
import backend from '../../backend'

class KodelisteContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      children: [],
      meta: {},
    }
  }

  componentDidMount() {
    this.fetchData(this.props.kode)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps.kode)
  }

  fetchData(kode) {
    backend.hentKode(kode).then(data => this.setState({ children: data }))
    backend.hentKodeMeta(kode).then(data => this.setState({ meta: data }))
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
          meta={this.state.meta}
          xkey={this.props.filterCode}
          filterCode={this.props.filterCode}
          filter={this.props.filter}
          onClick={this.props.onGoToCode}
          onCheck={this.props.onCheckChange}
          isSelected={this.props.isSelected}
        />
        {this.props.filter.map(item => <span key={item}>{item + ','}</span>)}
      </div>
    )
  }
}

export default KodelisteContainer
