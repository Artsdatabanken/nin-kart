import React, { Component } from 'react'
import backend from '../../backend'

class BildeAvatar extends Component {
  render() {
    const { kode, utenRamme } = this.props
    return (
      <img
        alt="fargevelger"
        style={Object.assign(utenRamme ? { borderRadius: 0 } : {}, {
          backgroundColor: 'transparent',
        })}
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
