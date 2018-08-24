import React from 'react'
import Tweaks from './'

class TweakContainer extends React.Component {
  render() {
    const { history, match, ...props } = this.props
    if (!this.erAktiv(props.koder, props.kode)) {
      // Laget er ikke lenger aktivt.  Browser refresh?
      history.replace('/')
      return null
    }
    return <Tweaks props />
  }

  erAktiv(koder, kode) {
    for (let n of koder || []) if (n.kode === kode) return true
    return false
  }
}

export default withRouter(TweakContainer)
