import React from 'react'
import { withRouter } from 'react-router'
import Tweaks from './'

class TweakContainer extends React.Component {
  render() {
    const { history, match, koder, ...props } = this.props
    if (!this.erAktiv(koder, props.kode)) {
      // Laget er ikke lenger aktivt.  Url fra annen sesjon?
      history.replace('/')
      return null
    }
    return <Tweaks {...props} />
  }

  erAktiv(koder, kode) {
    for (let n of koder || []) if (n.kode === kode) return true
    return false
  }
}

export default withRouter(TweakContainer)
