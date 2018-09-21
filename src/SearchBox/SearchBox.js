import Input from '@material-ui/core/Input'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class SearchBox extends Component {
  state = {}
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

  handleFocus = e => {
    this.setState({ focused: true })
    this.props.onQueryChange(e, this.props.tittel)
  }
  handleBlur = e => {
    this.setState({ focused: false })
    this.props.onQueryChange(e, this.props.tittel)
  }

  render() {
    console.log(this.state.focused)
    return (
      <Input
        inputRef={this.inputRef}
        onKeyDown={this.handleKeyDown}
        value={
          this.state.focused
            ? this.props.query
            : this.props.query || this.props.tittel || ''
        }
        placeholder={'Søk i Natur i Norge'}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
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
