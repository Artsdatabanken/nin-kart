import React, { Component } from 'react'
import { TextField } from 'material-ui'
import getNext from '../componentid'
import backend from '../backend'
import PropTypes from 'prop-types'
import rename from '../rename'

export default class FinnKode extends Component {
  queryNumber = 0

  handleChange = (e, q) => {
    this.queryNumber++
    this.props.onSearchResults(null)
    const currentQuery = this.queryNumber
    backend.søkKode(q).then(items => {
      items = rename(items)
      if (currentQuery !== this.queryNumber) return // Abort stale query
      if (items.error) this.props.onSearchResults(null)
      else this.props.onSearchResults(items)
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
        hintText="Søk i økologisk grunnkart..."
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
