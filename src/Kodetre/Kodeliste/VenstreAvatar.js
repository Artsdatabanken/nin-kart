import React, { Component } from 'react'
import { Avatar } from 'material-ui'
import backend from '../../backend'

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
        onError={e => {
          e.target.src = backend.getFileStorageUrl(
            `bilde/avatar/40/${'404'}.jpg`
          )
        }}
      >
        {imageSrc ? null : kode}
      </Avatar>
    )
  }
}

export default VenstreAvatar
