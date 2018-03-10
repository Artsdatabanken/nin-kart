import React, { Component } from 'react'
import { Paper, List, ListItem, Divider } from 'material-ui'
import RotAvatar from './RotAvatar'

class ResultatListe extends Component {
  render() {
    const { onClick, query, searchResults } = this.props
    if (!searchResults) return null
    if (!searchResults.length > 0) return null
    return (
      <Paper zDepth={1}>
        <List
          style={{
            overflow: 'auto',
            maxHeight: 494,
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {searchResults.map(item => {
            const kode = item.kode.toUpperCase()
            return (
              <React.Fragment key={item.kode}>
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
                  onClick={() => {
                    onClick(item.kode)
                  }}
                  key={kode}
                  primaryText={ResultatListe.highlightMatch(item.navn, query)}
                  leftIcon={RotAvatar.for(kode)}
                >
                  <div style={{ float: 'right' }}>
                    {ResultatListe.highlightMatch(kode, query)}
                  </div>
                </ListItem>
                <Divider inset={true} />
              </React.Fragment>
            )
          })}
        </List>
      </Paper>
    )
  }

  static highlightMatch(navn, query) {
    if (!query) return navn
    const q = query.toLowerCase().split(' ')[0]
    const offset = navn.toLowerCase().indexOf(q)
    if (offset < 0) return navn

    let r = []
    r.push(navn.substring(0, offset))
    const end = offset + q.length
    r.push(
      <span style={{ color: 'black' }}>{navn.substring(offset, end)}</span>
    )
    r.push(navn.substring(end, navn.length))
    return <span>{r}</span>
  }
}

export default ResultatListe
