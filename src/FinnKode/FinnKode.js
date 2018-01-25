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

  handleBlur = () => {
    this.props.onBlur()
  }

  onKeyDown = e => {
    if (e.keyCode === 27) {
      this.handleBlur()
      e.stopPropagation()
    }
  }

  render() {
    return (
      <TextField
        onBlur={this.handleBlur}
        onKeyDown={this.onKeyDown}
        id={getNext()}
        hintText="Søk..."
        onChange={this.handleChange}
        fullWidth={true}
        autoFocus
      />
    )
  }
}

FinnKode.propTypes = {
  onSearchResults: PropTypes.func,
}
