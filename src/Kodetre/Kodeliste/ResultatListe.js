import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'
import config from '../../config'
import språk from '../../språk'
import Bildeavatar from './Bildeavatar'

const styles = {
  text: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: 13,
    width: 240,
  },
  inset: { marginLeft: 56 },
}

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
    const { onClick, query, searchResults, classes } = this.props
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
                  button={true}
                  style={{
                    height: 38,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    onClick(item.kode)
                  }}
                  key={kode}
                >
                  {true ? (
                    <Bildeavatar size="small" kode={kode} />
                  ) : (
                    <Avatar style={{ width: 24, height: 24 }}>
                      <img
                        alt={prefix}
                        src={config.avatar24px(prefix)}
                        onError={e => {
                          const brokenImage = config.avatar24px('404')
                          if (e.target.src !== brokenImage)
                            e.target.src = brokenImage
                        }}
                      />
                    </Avatar>
                  )}
                  <ListItemText classes={{ primary: classes.text }}>
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
                <Divider inset={true} classes={{ inset: classes.inset }} />
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
    let terms = (higlight || '')
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
                ? { color: 'black', fontWeight: 500 }
                : { color: '#333', fontWeight: 400 }
            }
          >
            {part}
          </span>
        ))}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(ResultatListe)
