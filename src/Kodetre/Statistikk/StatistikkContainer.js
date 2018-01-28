import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Statistikk from './index'

class StatistikkContainer extends Component {
  state = { blokker: [] }
  render() {
    return <Statistikk blokker={this.state.blokker} />
  }

  componentDidMount() {
    //   this.context.fetchJson('Statistikk', this.props.dataUrl, json =>
    this.context.fetchJson('Statistikk', '/kode/TAX.json', json =>
      this.receiveData(json)
    )
  }

  receiveData(json) {
    json.then(json => {
      this.setState({ blokker: json.statistikk })
    })
  }

  static contextTypes = {
    fetchJson: PropTypes.func,
  }
}

export default StatistikkContainer
