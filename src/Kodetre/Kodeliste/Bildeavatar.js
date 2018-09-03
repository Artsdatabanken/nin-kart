import typesystem from '@artsdatabanken/typesystem'
import { Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'
import backend from '../../backend'
import farger from '../../farger'

const styles = {
  utenRamme: {
    borderRadius: 0,
  },
  img: {
    objectFit: 'contain',
  },
}

class BildeAvatar extends Component {
  render() {
    const { classes, kode, utenRamme } = this.props
    const prefiks = kode.substring(0, 2)
    const parts = typesystem.splittKode(kode)
    const tekst = parts[parts.length - 1]
    if (prefiks === 'AO' && parts.length > 1)
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
    return (
      <Avatar style={{ backgroundColor: farger.mørk[prefiks] }}>{tekst}</Avatar>
    )
  }
}

export default withStyles(styles)(BildeAvatar)
