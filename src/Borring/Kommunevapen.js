import React, { Component } from 'react'
import backend from '../backend'

class Kommunevapen extends Component {
  render() {
    const { kode } = this.props
    return (
      <img
        ref={el => (this.logo = el)}
        onLoad={() => {
          this.logo.style.opacity = 1
        }}
        alt="logo"
        src={backend.getFotoOmslag(kode, 408, 'png')}
        style={{
          opacity: 0,
          width: 56,
          filter: 'drop-shadow(3px 3px 2px #444)',
          animation: 'fadein 3s ease',
        }}
        onError={e => {
          const brokenAvatar = backend.avatar40px('~', 'png')
          if (e.target.src !== brokenAvatar) e.target.src = brokenAvatar
        }}
      />
    )
  }
}

export default Kommunevapen
