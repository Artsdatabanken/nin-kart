import React, { Component } from 'react'
import { Avatar } from 'material-ui'
import backend from '../../backend'

class BildeAvatar extends Component {
  render() {
    const { kode, utenRamme } = this.props
    return (
      <Avatar
        style={Object.assign(
          this.props.style,
          utenRamme ? { borderRadius: 0 } : {}
        )}
        src={backend.getFotoAvatar(kode)}
        onError={e => {
          const brokenAvatar = backend.getFotoAvatar('~', 40)
          if (e.target.src !== brokenAvatar) e.target.src = brokenAvatar
        }}
      />
    )
  }
}

export default BildeAvatar
