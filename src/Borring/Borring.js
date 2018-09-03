import { withTheme } from '@material-ui/core/styles'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Listeelement from './Listeelement'

class Borring extends Component {
  render() {
    const { barn } = this.props
    if (!barn) return null
    return (
      <React.Fragment>
        {['AO', 'NA', 'RL', 'VV', 'BS', 'MI'].map(kode => {
          const node = barn[kode]
          if (!node) return null
          const r = oppsummer(node)
          return (
            <Listeelement
              key={r.kode}
              kode={r.kode}
              primary={r.verdi}
              secondary={r.nivå}
              geom_id={r.geom_id}
            />
          )
        })}
      </React.Fragment>
    )
  }
}

function oppsummer(node) {
  let r = {}
  oppsummer2(node, r)
  return r
}

function oppsummer2(node, r) {
  if (!node.barn) {
    r.verdi = node.tittel
    r.kode = node.kode
    r.geom_id = node.geom_id
    return
  }

  Object.keys(node.barn).forEach(kode => {
    r.nivå = node.tittel
    oppsummer2(node.barn[kode], r)
  })
}

export default withRouter(withTheme()(Borring))
