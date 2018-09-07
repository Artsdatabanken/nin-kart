import Input from '@material-ui/core/Input'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class SearchBox extends Component {
  handleKeyDown = e => {
    if (e.keyCode === 27) {
      if (this.props.query) {
        this.props.onQueryChange({ target: { value: '' } })
        return
      }

      if (!this.props.isAtRoot) {
        this.props.onExitToRoot()
        e.stopPropagation()
      }
    }
  }

  handleFocus = e => {
    this.props.onQueryChange(e, this.props.tittel)
  }

  render() {
    return (
      <Input
        onKeyDown={this.handleKeyDown}
        value={this.props.query || this.props.tittel || ''}
        placeholder={'Søk i Natur i Norge'}
        onFocus={this.handleFocus}
        onChange={this.props.onQueryChange}
        fullWidth={true}
        disableUnderline={true}
        autoFocus={true}
      />
    )
  }
}

SearchBox.propTypes = {
  onSearchResults: PropTypes.func,
}
