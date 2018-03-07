import React, { Component } from 'react'
import { TextField } from 'material-ui'
import getNext from '../componentid'
import backend from '../backend'
import PropTypes from 'prop-types'
import rename from '../rename'

export default class SearchBox extends Component {
  queryNumber = 0

  handleChange = (e, q) => {
    console.log('handleChange', q)
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

  handleFocus = e => {
    console.log('handleFocus', this.props.title)
    this.handleChange(e, this.props.title)
  }

  onKeyDown = e => {
    if (e.keyCode === 27) {
      this.props.onBlur()
      e.stopPropagation()
    }
  }

  render() {
    console.log('q', this.props.query)
    return (
      <TextField
        onBlur={this.props.onBlur}
        onKeyDown={this.onKeyDown}
        //        id={getNext()}
        value={this.props.query}
        //        hintText={this.props.title ? this.props.title : 'Økologisk grunnkart'}
        onFocus={this.handleFocus}
        onChange={this.handleChange}
        fullWidth={true}
        //        autoFocus
        underlineShow={false}
        style={{ height: 48, cursor: 'text' }}
      />
    )
  }
}

SearchBox.propTypes = {
  onSearchResults: PropTypes.func,
}
