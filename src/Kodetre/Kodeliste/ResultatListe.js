import React, { Component } from 'react'
import { Paper, List, ListItem, Avatar } from 'material-ui'

class ResultatListe extends Component {
  render() {
    return (
      <Paper>
        <List style={{ overflow: 'auto', maxHeight: 600 }}>
          {this.props.searchResults.length &&
            this.props.searchResults.map(item => (
              <ListItem
                style={{ width: 500, pointer: 'hand' }}
                onClick={() => this.props.onClick(item.code)}
                key={item.code}
                primaryText={item.name}
                secondaryText={item.code}
                leftAvatar={
                  <Avatar src="https://www.artsdatabanken.no/Media/F1698?mode=480x480" />
                }
              />
            ))}
        </List>
      </Paper>
    )
  }
}

export default ResultatListe
