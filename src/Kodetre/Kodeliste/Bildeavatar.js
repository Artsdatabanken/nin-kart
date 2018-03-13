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
        src={backend.avatar40px(kode)}
        onError={e => {
          const brokenAvatar = backend.avatar40px('~', 40)
          if (e.target.src !== brokenAvatar) e.target.src = brokenAvatar
        }}
      />
    )
  }
}

export default BildeAvatar
