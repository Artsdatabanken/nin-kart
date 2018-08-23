import { Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'
import backend from '../../backend'

const styles = {
  utenRamme: {
    borderRadius: 0,
  },
  img: {
    objectFit: 'contains',
  },
}

class BildeAvatar extends Component {
  render() {
    const { classes, kode, utenRamme } = this.props
    return (
      <Avatar
        alt="logo"
        classes={{
          root: utenRamme && classes.utenRamme,
          img: classes.img,
        }}
        src={backend.avatar40px(kode)}
        onError={e => {
          const brokenAvatar = backend.avatar40px('~', 40)
          if (e.target.src !== brokenAvatar) e.target.src = brokenAvatar
        }}
      />
    )
  }
}

export default withStyles(styles)(BildeAvatar)
