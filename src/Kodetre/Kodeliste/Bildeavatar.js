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
    const { classes } = this.props
    const kode = this.props.kode.replace('-VV', '') // HACK verneområder under kommune
    const prefiks = kode.substring(0, 2)
    const parts = typesystem.splittKode(kode)
    const tekst = parts[parts.length - 1]
    if ('AO_OR'.indexOf(prefiks) >= 0 && parts.length > 1)
      return (
        <Avatar
          alt="logo"
          classes={{
            root: classes.utenRamme,
            img: classes.img,
          }}
          src={backend.avatar40px(kode, 'png')}
          onError={e => {
            const brokenAvatar = backend.avatar40px('~')
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
