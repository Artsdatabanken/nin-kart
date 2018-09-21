import typesystem from '@artsdatabanken/typesystem'
import { Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'
import config from '../../config'
import farger from '../../farger'

const styles = {
  img: {
    objectFit: 'contain',
    height: 35,
    filter: 'drop-shadow(1px 1px 1px #666)',
  },
  big: {},
  small: { width: 24, height: 24, fontSize: 13 },
  big_noborder: {
    borderRadius: 0,
  },
  small_noborder: {
    borderRadius: 0,
    width: 24,
    height: 24,
    fontSize: 13,
  },
}

class BildeAvatar extends Component {
  render() {
    const { classes } = this.props
    const size = this.props.size || 'big'
    const kode = this.props.kode.replace('-VV', '') // HACK verneområder under kommune
    const prefiks = kode.substring(0, 2)
    const parts = typesystem.splittKode(kode)
    const tekst = prefiks //parts[parts.length - 1]
    if ('AO_OR'.indexOf(prefiks) >= 0 && parts.length > 1)
      return (
        <Avatar
          alt="logo"
          classes={{
            root: classes[size + '_noborder'],
            img: classes.img,
          }}
          src={config.avatar40px(kode, 'png')}
          onError={e => {
            const brokenAvatar = config.avatar40px('~')
            if (e.target.src !== brokenAvatar) e.target.src = brokenAvatar
          }}
        />
      )
    return (
      <Avatar
        classes={{
          root: classes[size],
        }}
        style={{
          backgroundColor: farger.mørk[prefiks],
        }}
      >
        {tekst}
      </Avatar>
    )
  }
}

export default withStyles(styles)(BildeAvatar)
