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
            maxHeight: 600,
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
                  onClick={() => onClick(kode)}
                  key={kode}
                  primaryText={this.highlightMatch(item.navn, query)}
                  leftIcon={RotAvatar.for(kode)}
                >
                  <div style={{ float: 'right' }}>
                    {this.highlightMatch(kode, query)}
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

  highlightMatch(navn, query) {
    if (!query) return navn
    const qsegs = query.toLowerCase().split(' ')
    const offsets = qsegs.map(q => navn.toLowerCase().indexOf(q))
    let r = []
    let start = 0
    for (let i = 0; i < offsets.length; i++) {
      const offset = offsets[i]
      if (offset >= 0 && qsegs[i].length > 0) {
        r.push(navn.substring(start, offsets[i]))
        const end = offsets[i] + qsegs[i].length
        r.push(
          <span key={i} style={{ color: 'black' }}>
            {navn.substring(offsets[i], end)}
          </span>
        )
        start = end
      }
    }
    r.push(navn.substring(start, navn.length))
    return <span>{r}</span>
  }
}

export default ResultatListe
