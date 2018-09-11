import Input from '@material-ui/core/Input'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class SearchBox extends Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }

  handleKeyDown = e => {
    if (e.keyCode !== 27) return
    this.inputRef.current.blur()
    e.stopPropagation()
    this.props.onQueryChange({ target: { value: '' } })
  }

  handleFocus = e => {
    this.props.onQueryChange(e, this.props.tittel)
  }

  render() {
    return (
      <Input
        inputRef={this.inputRef}
        onKeyDown={this.handleKeyDown}
        value={this.props.query || this.props.tittel || ''}
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
