import React, { Component } from 'react'
import { Paper, List, ListItem, Divider } from 'material-ui'
import RotAvatar from './RotAvatar'

class ResultatListe extends Component {
  render() {
    if (!this.props.searchResults) return null
    if (!this.props.searchResults.length > 0) return null
    return (
      <Paper zDepth={1}>
        <List
          style={{
            overflow: 'auto',
            maxHeight: 600,
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {this.props.searchResults.map(item => {
            const kode = item.kode.toUpperCase()
            return (
              <React.Fragment>
                <ListItem
                  insetChildren={true}
                  style={{
                    width: 392,
                    height: 38,
                    pointer: 'hand',
                    paddingTop: 0,
                    paddingBottom: 1,
                  }}
                  innerDivStyle={{
                    paddingTop: 11,
                    paddingBottom: 11,
                    fontSize: 13,
                    lineheight: 24,
                    fontWeight: 500,
                  }}
                  onClick={() => this.props.onClick(kode)}
                  key={kode}
                  primaryText={this.highlightMatch(item.navn)}
                  leftIcon={RotAvatar.for(kode)}
                >
                  <div style={{ float: 'right' }}>{kode}</div>
                </ListItem>
                <Divider inset={true} />
              </React.Fragment>
            )
          })}
        </List>
      </Paper>
    )
  }
  highlightMatch(kode, query) {
    return kode
  }
}

export default ResultatListe
