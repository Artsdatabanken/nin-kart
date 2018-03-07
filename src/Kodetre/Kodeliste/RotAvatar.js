import React from 'react'
import { Avatar } from 'material-ui'

// TODO: Vis statiske bilder
class RotAvatar {
  static for(kode) {
    const prefix = RotAvatar.prefix(kode)
    return (
      <Avatar
        style={{
          textAlign: 'center',
          lineHeight: '24px',
          fontSize: 13,
          marginTop: 7,
          marginBottom: 7,
        }}
      >
        {prefix}
      </Avatar>
    )
  }

  static prefix(kode) {
    return kode.substring(0, 2)
  }
}

export default RotAvatar
