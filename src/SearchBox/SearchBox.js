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
    return (
      <Input
        ref={tf => (this.Input = tf)}
        onKeyDown={this.handleKeyDown}
        value={this.props.query || ''}
        placeholder={'Søk i Natur i Norge'}
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
