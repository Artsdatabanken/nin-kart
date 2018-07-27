import { TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import getNext from '../componentid'

export default class SearchBox extends Component {
  handleKeyDown = e => {
    if (e.keyCode === 27) {
      this.props.onQueryChange(e, '')
      this.textField.blur()
      e.stopPropagation()
    }
  }

  handleFocus = e => {
    this.props.onQueryChange(e, this.props.tittel)
  }

  render() {
    const { query, tittel } = this.props
    return (
      <TextField
        ref={tf => (this.textField = tf)}
        onKeyDown={this.handleKeyDown}
        id={getNext()}
        value={query || ''}
        hintText={tittel ? tittel : 'Natur i Norge'}
        onFocus={this.handleFocus}
        onChange={this.props.onQueryChange}
        fullWidth={true}
        underlineShow={false}
        style={{ lineHeight: '24px' }}
        inputStyle={{ color: 'black', fontSize: '15px' }}
        hintStyle={{ color: 'hsl(0, 0%, 75%)', fontSize: '15px' }}
      />
    )
  }
}

SearchBox.propTypes = {
  onSearchResults: PropTypes.func,
}
