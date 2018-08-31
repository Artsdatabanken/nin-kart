import { withTheme } from '@material-ui/core/styles'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Listeelement from './Listeelement'

class Borring extends Component {
  render() {
    const { innhold } = this.props
    return (
      <React.Fragment>
        {Object.keys(innhold.barn).map(kode => {
          const node = innhold.barn[kode]
          const r = oppsummer(node)
          return (
            <Listeelement kode={r.kode} primary={r.verdi} secondary={r.nivå} />
          )
        })}
      </React.Fragment>
    )
  }
}

function oppsummer(node) {
  let r = {}
  oppsummer2(node, r)
  console.log(r)
  return r
}

function oppsummer2(node, r) {
  if (!node.barn) {
    r.verdi = node.tittel
    r.kode = node.kode
    return
  }

  Object.keys(node.barn).forEach(kode => {
    r.nivå = node.tittel
    oppsummer2(node.barn[kode], r)
  })
}

export default withRouter(withTheme()(Borring))
