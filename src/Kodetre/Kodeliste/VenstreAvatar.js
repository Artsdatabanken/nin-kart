import React, { Component } from 'react'
import { Avatar } from 'material-ui'

class VenstreAvatar extends Component {
  render() {
    const { kode, utenRamme, color, backgroundColor, imageSrc } = this.props
    return (
      <Avatar
        style={Object.assign(
          this.props.style,
          utenRamme ? { borderRadius: 0 } : {}
        )}
        color={color}
        backgroundColor={imageSrc ? 'transparent' : backgroundColor}
        src={imageSrc}
      >
        {imageSrc ? null : kode}
      </Avatar>
    )
  }
}

export default VenstreAvatar
