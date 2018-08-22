import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from '@material-ui/core'
import React, { Component } from 'react'
import Backend from '../../backend'
import språk from '../../språk'

class ResultatListe extends Component {
  filtrer(kode) {
    const prefix = kode.substring(0, 2)
    switch (prefix) {
      case 'AR':
      case 'AO':
      case 'VV':
        return ''
      default:
        return kode.substring(3)
    }
  }

  render() {
    const { onClick, query, searchResults } = this.props
    if (!searchResults) return null
    if (!searchResults.length > 0) return null
    return (
      <Paper elevation={1}>
        <List
          style={{
            overflow: 'hidden',
          }}
        >
          {searchResults.map(item => {
            const kode = item.kode.toUpperCase()
            const prefix = kode.substring(0, 2)
            const navn = språk(item.navn)

            return (
              <React.Fragment key={item.kode}>
                <ListItem
                  style={{
                    height: 38,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    onClick(item.kode)
                  }}
                  key={kode}
                >
                  <Avatar style={{ width: 24, height: 24 }}>
                    <img
                      alt={prefix}
                      src={Backend.avatar24px(prefix)}
                      onError={e => {
                        const brokenImage = Backend.avatar24px('404')
                        if (e.target.src !== brokenImage)
                          e.target.src = brokenImage
                      }}
                    />
                  </Avatar>
                  <ListItemText
                    style={{
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      fontSize: 9,
                      fontWeight: 500,
                    }}
                  >
                    {ResultatListe.highlightMatch(navn, query)}
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <ListItemText>
                      <div
                        style={{
                          fontWeight: 800,
                        }}
                      >
                        {ResultatListe.highlightMatch(
                          this.filtrer(kode),
                          query
                        )}
                      </div>
                    </ListItemText>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider inset={true} />
              </React.Fragment>
            )
          })}
        </List>
      </Paper>
    )
  }

  // Highlight all matches
  static highlightMatch(text, higlight) {
    // make array of terms, ordered by longest term
    let terms = higlight
      .toLowerCase()
      .split(' ')
      .sort(function(a, b) {
        return b.length - a.length
      })
    // make regex OR filter by concatenating terms with |
    let filter = terms
      .toString()
      .toLowerCase()
      .replace(/[,\\]/g, '|')

    // Split on all terms and also include the terms into parts array, ignore case
    let parts = text.split(new RegExp(`(${filter})`, 'gi'))
    return (
      <React.Fragment>
        {' '}
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              terms.indexOf(part.toLowerCase()) >= 0
                ? { color: 'black', fontWeight: 'bold' }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </React.Fragment>
    )
  }
}

export default ResultatListe
