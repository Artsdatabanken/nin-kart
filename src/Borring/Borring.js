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
            return ['VV', 'AO', 'LA', 'NA', 'RL'].map(kode => {
              const node = barn[kode]
              if (!node) return null
              if (!node.values) return null
              return Object.keys(node.values).map(subkode => {
                return (
                  <Seksjon
                    key={subkode}
                    tittel={node.title}
                    kode={subkode}
                    kategori={node.title}
                    node={node.values[subkode]}
                    visKoder={context.visKoder}
                    onClick={() => this.onClick(subkode)}
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
