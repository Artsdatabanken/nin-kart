import { withTheme } from '@material-ui/core'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { SettingsContext } from '../SettingsContext'
import Listeelement from './Listeelement'

class Borring extends Component {
  render() {
    const { barn } = this.props
    if (!barn) return null
    return (
      <SettingsContext.Consumer>
        {context => {
          return ['AO', 'NA', 'RL', 'VV', 'BS', 'MI'].map(kode => {
            const node = barn[kode]
            if (!node) return <React.Fragment key={kode} />
            const r = oppsummer(node)
            return (
              <Listeelement
                key={r.kode}
                kode={r.kode}
                primary={this.map(kode, r.verdi)}
                secondary={r.nivå}
                geom_id={r.geom_id}
                visKoder={context.visKoder}
              />
            )
          })
        }}
      </SettingsContext.Consumer>
    )
  }

  map(kode, verdi) {
    if (kode === 'NA') {
      const len = verdi.length
      const sum = (len * (len + 1)) / 2
      return verdi.map((v, i) => {
        console.log(i, sum)
        const prosent = ((100 * (len - i)) / sum).toFixed(0)
        return (
          <div>
            {len > 1 && prosent + '% '}
            {v}
          </div>
        )
      })
    }
    return verdi[0]
  }
}

function oppsummer(node) {
  let r = {}
  oppsummer2(node, r)
  return r
}

function oppsummer2(node, r) {
  if (!node.barn) {
    let v = node.tittel
    if (r.verdi) r.verdi.push(v)
    else r.verdi = [v]
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
