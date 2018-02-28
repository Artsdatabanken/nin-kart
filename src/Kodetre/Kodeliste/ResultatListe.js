import React, { Component } from 'react'
import { List, ListItem, Avatar } from 'material-ui'

class ResultatListe extends Component {
  render() {
    return (
      <List style={{ overflow: 'auto', maxHeight: 600 }}>
        {this.props.searchResults.map(item => (
          <ListItem
            style={{ width: 500, pointer: 'hand' }}
            onClick={() => this.props.onClick(item.kode)}
            key={item.kode}
            primaryText={item.navn}
            secondaryText={item.kode}
            leftAvatar={
              <Avatar src="https://www.artsdatabanken.no/Media/F1698?mode=480x480" />
            }
          />
        ))}
      </List>
    )
  }
}

export default ResultatListe
