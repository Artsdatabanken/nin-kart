import { List, ListSubheader, withTheme } from '@material-ui/core'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { SettingsContext } from '../SettingsContext'
import Seksjon from './Seksjon'

class Borring extends Component {
  render() {
    const { barn } = this.props
    console.log(barn)
    if (!barn) return null
    return (
      <List>
        <ListSubheader>Beskrivelse av natur</ListSubheader>
        <SettingsContext.Consumer>
          {context => {
            return ['VV', 'AO', 'NA', 'RL', 'BS', 'MI'].map(kode => {
              const node = barn[kode]
              if (!node) return null
              if (!node.barn) return null
              return Object.keys(node.barn).map(kode2 => {
                return (
                  <Seksjon
                    key={kode + '_' + kode2}
                    kode={kode + '_' + kode2}
                    kategori={node.tittel}
                    node={node.barn[kode2]}
                    visKoder={context.visKoder}
                  />
                )
              })
            })
          }}
        </SettingsContext.Consumer>
      </List>
    )
  }
}

export default withRouter(withTheme()(Borring))
