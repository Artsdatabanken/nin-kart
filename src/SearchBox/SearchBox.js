import React, { Component } from 'react'
import { TextField } from 'material-ui'
//import getNext from '../componentid'
import backend from '../backend'
import PropTypes from 'prop-types'
import rename from '../rename'

export default class SearchBox extends Component {
  queryNumber = 0
  state = {}

  handleChange = (e, q) => {
    console.log('handleChange', q)
    this.setState({ query: q })
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
    this.handleChange(e, this.state.query)
  }

  onKeyDown = e => {
    if (e.keyCode === 27) {
      this.handleChange(e, '')
      this.textField.blur()
      e.stopPropagation()
    }
  }

  componentWillReceiveProps(nextProps, props) {
    console.log(nextProps, props)
    if (nextProps.query !== this.props.query)
      this.setState({ query: nextProps.query || '' })
  }

  render() {
    const query = this.state.query
    return (
      <TextField
        ref={tf => (this.textField = tf)}
        onKeyDown={this.onKeyDown}
        //id={getNext()}
        value={query}
        hintText={!query && 'Økologisk grunnkart'}
        onFocus={this.handleFocus}
        onChange={this.handleChange}
        fullWidth={true}
        underlineShow={false}
        inputStyle={{ fontSize: '15px' }}
        hintStyle={{ fontSize: '15px' }}
      />
    )
  }
}

SearchBox.propTypes = {
  onSearchResults: PropTypes.func,
}
