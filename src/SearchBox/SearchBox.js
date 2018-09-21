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
    this.props.onQueryChange({
      target: { value: '' },
    })
  }

  render() {
    const { onFocus, onBlur, onQueryChange, query } = this.props
    return (
      <Input
        inputRef={this.inputRef}
        onKeyDown={this.handleKeyDown}
        value={query}
        placeholder={'Søk i Natur i Norge'}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onQueryChange}
        fullWidth={true}
        disableUnderline={true}
      />
    )
  }
}

SearchBox.propTypes = {
  onSearchResults: PropTypes.func,
}
