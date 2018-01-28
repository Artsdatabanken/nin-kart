import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { List, ListItem, Avatar } from 'material-ui'

class ResultatListe extends Component {
  render() {
    return (
      <List style={{ overflow: 'auto', maxHeight: 600 }}>
        <Route
          render={({ history }) =>
            this.props.searchResults.map(item => (
              <ListItem
                style={{ width: 500, pointer: 'hand' }}
                onClick={() => {
                  history.push('/' + item.code)
                  this.setState({ searchResults: null })
                }}
                key={item.code}
                primaryText={item.name}
                secondaryText={item.code}
                leftAvatar={
                  <Avatar src="https://www.artsdatabanken.no/Media/F1698?mode=480x480" />
                }
              />
            ))
          }
        />
      </List>
    )
  }
}

export default ResultatListe
