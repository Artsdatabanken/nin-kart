import { List, ListSubheader, withTheme } from '@material-ui/core'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { SettingsContext } from '../SettingsContext'
import Seksjon from './Seksjon'

class Borring extends Component {
  render() {
    const { barn } = this.props
    if (!barn) return null
    return (
      <List>
        <ListSubheader>Kunnskap om naturen i 10 meter radius</ListSubheader>
        <SettingsContext.Consumer>
          {context => {
            return ['VV', 'AO', 'NA', 'RL', 'BS', 'MI'].map(kode => {
              const node = barn[kode]
              if (!node) return null
              if (!node.barn) return null
              return Object.keys(node.barn).map(subkode => {
                const kode2 = kode + '_' + subkode
                return (
                  <Seksjon
                    key={kode2}
                    kode={kode2}
                    kategori={node.tittel}
                    node={node.barn[subkode]}
                    visKoder={context.visKoder}
                    onClick={() => this.onClick(kode2)}
                  />
                )
              })
            })
          }}
        </SettingsContext.Consumer>
      </List>
    )
  }

  onClick = kode => {
    const { history } = this.props
    history.push('/katalog/' + kode)
  }
}

export default withRouter(withTheme()(Borring))
