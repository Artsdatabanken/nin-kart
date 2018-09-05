import Input from '@material-ui/core/Input'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class SearchBox extends Component {
  constructor(props) {
    super(props)
    this.Input = React.createRef()
  }

  handleKeyDown = e => {
    if (e.keyCode === 27) {
      this.props.onQueryChange(e, '')
      console.log(this.Input.current)
      console.log(this.Input.current.blur)
      if (this.Input.current.blur) this.Input.current.blur()
      e.stopPropagation()
    }
  }

  handleFocus = e => {
    this.props.onQueryChange(e, this.props.tittel)
  }

  render() {
    return (
      <Input
        ref={this.Input}
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
