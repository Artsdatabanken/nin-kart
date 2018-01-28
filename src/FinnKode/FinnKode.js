import React, { Component } from 'react'
import { TextField } from 'material-ui'
import getNext from '../componentid'
import backend from '../backend'
import PropTypes from 'prop-types'

export default class FinnKode extends Component {
  constructor(props) {
    super(props)
    this.queryNumber = 0
  }

  handleChange = (e, q) => {
    if (q.length < 3) {
      this.props.onSearchResults(null)
      return
    }
    this.queryNumber++
    const currentQuery = this.queryNumber
    backend.søkKode(q).then(items => {
      if (currentQuery !== this.queryNumber) return // Abort stale query
      this.props.onSearchResults(items)
    })
  }

  onKeyDown = e => {
    if (e.keyCode === 27) {
      this.props.onBlur()
      e.stopPropagation()
    }
  }

  render() {
    return (
      <TextField
        onBlur={this.props.onBlur}
        onKeyDown={this.onKeyDown}
        id={getNext()}
        hintText="Søk i Økologisk grunnkart..."
        onChange={this.handleChange}
        fullWidth={true}
        autoFocus
        underlineShow={false}
        style={{ height: 48, cursor: 'text' }}
      />
    )
  }
}

FinnKode.propTypes = {
  onSearchResults: PropTypes.func,
}
