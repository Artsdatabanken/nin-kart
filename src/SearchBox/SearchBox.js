import Input from '@material-ui/core/Input'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class SearchBox extends Component {
  handleKeyDown = e => {
    if (e.keyCode === 27) {
      this.props.onQueryChange(e, '')
      this.Input.blur()
      e.stopPropagation()
    }
  }

  handleFocus = e => {
    this.props.onQueryChange(e, this.props.tittel)
  }

  render() {
    const { query, tittel } = this.props
    console.log(query, tittel)
    return (
      <Input
        ref={tf => (this.Input = tf)}
        onKeyDown={this.handleKeyDown}
        //        id={getNext()}
        value={query || ''}
        placeholder={tittel ? tittel : 'Natur i Norge'}
        onFocus={this.handleFocus}
        onChange={this.props.onQueryChange}
        fullWidth={true}
        disableUnderline={true}
      />
    )
  }
}

SearchBox.propTypes = {
  onSearchResults: PropTypes.func,
}
