import React from 'react'
import { withRouter } from 'react-router'
import Tweaks from './'

class TweakContainer extends React.Component {
  render() {
    const { history, match, koder, ...props } = this.props
    if (!koder[props.kode]) {
      // Laget er ikke lenger aktivt.  Url fra annen sesjon?
      history.replace('/')
      return null
    }
    return <Tweaks {...props} />
  }
}

export default withRouter(TweakContainer)
