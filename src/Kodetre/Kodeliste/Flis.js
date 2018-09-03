import typesystem from '@artsdatabanken/typesystem'
import { Avatar, Chip } from '@material-ui/core'
import React, { Component } from 'react'
import backend from '../../backend'
import farger from '../../farger'

class Flis extends Component {
  render() {
    const { kode } = this.props
    const prefiks = kode.substring(0, 2)
    const parts = typesystem.splittKode(kode)
    if (prefiks === 'AO' && parts.length > 1)
      return (
        <div style={{ paddingBottom: 4, paddingRight: 8 }}>
          <img
            alt="logo"
            src={backend.avatar40px(kode)}
            style={{ filter: 'drop-shadow(2px 2px 2px #666)' }}
            onError={e => {
              const brokenAvatar = backend.avatar40px('~', 40)
              if (e.target.src !== brokenAvatar) e.target.src = brokenAvatar
            }}
          />
        </div>
      )
    return (
      <Chip
        style={{
          filter: 'drop-shadow(2px 2px 2px #666)',
        }}
        avatar={
          <Avatar
            style={{
              backgroundColor: farger.medium[prefiks],
              color: 'white',
            }}
          >
            {prefiks}
          </Avatar>
        }
        label={kode.substring(3)}
      />
    )
  }
}

export default Flis
