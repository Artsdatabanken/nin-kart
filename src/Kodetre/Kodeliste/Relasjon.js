import React, { Component } from 'react'
import { Avatar, List, ListItem } from 'material-ui'

class Relasjon extends Component {
  render() {
    return (
      <List>
        {this.props.relasjon.map(r => (
          <ListItem
            key={r.kode}
            leftAvatar={
              r.avatar && <Avatar backgroundColor="#00000000" src={r.avatar} />
            }
            primaryText={r.tittel}
            secondaryText={r.kode}
          />
        ))}
      </List>
    )
  }
}

export default Relasjon
