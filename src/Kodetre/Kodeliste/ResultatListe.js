import React, { Component } from 'react'
import { Paper, List, ListItem, Divider } from 'material-ui'
import Backend from '../../backend'

class ResultatListe extends Component {
  lagSammensattNavn(language, navnObj) {
    if (!language) return ''
    if (language.length === 1) {
      return navnObj[language[0]]
    } else if (language.length === 2) {
      let primary = navnObj[language[0]]
      let secondary = navnObj[language[1]]
      return primary && secondary
        ? primary + ' (' + secondary + ')'
        : primary ? primary : secondary
    }
  }

  filtrer(kode) {
    const prefix = kode.substring(0, 2)
    switch (prefix) {
      case 'AR':
        return ''
      case 'AO':
        return ''
      case 'VV':
        return ''
      default:
        return kode.substring(3)
    }
  }

  render() {
    const { onClick, query, searchResults, language } = this.props
    if (!searchResults) return null
    if (!searchResults.length > 0) return null
    return (
      <Paper zDepth={1}>
        <List
          style={{
            overflow: 'hidden',
            maxHeight: 494,
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {searchResults.map(item => {
            const kode = item.kode.toUpperCase()
            const prefix = kode.substring(0, 2)
            const navn = this.lagSammensattNavn(language, item.navn)
            let forelder = ''
            if (item.forelder && item.forelder.navn) {
              forelder = this.lagSammensattNavn(language, item.forelder.navn)
            }

            return (
              <React.Fragment key={item.kode}>
                <ListItem
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
                    paddingLeft: 66,
                    fontSize: 13,
                    lineheight: 24,
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                  onClick={() => {
                    onClick(item.kode)
                  }}
                  key={kode}
                  primaryText={
                    <React.Fragment>
                      <span>{ResultatListe.highlightMatch(navn, query)}</span>
                      &nbsp;<span style={{ color: '#aaa' }}>
                        {ResultatListe.highlightMatch(forelder, query)}
                      </span>
                    </React.Fragment>
                  }
                  leftIcon={
                    <img
                      style={{ marginTop: 6, marginLeft: 16 }}
                      alt={prefix}
                      src={Backend.avatar24px(prefix)}
                      onError={e => {
                        const brokenImage = Backend.avatar24px('404')
                        if (e.target.src !== brokenImage)
                          e.target.src = brokenImage
                      }}
                    />
                  }
                >
                  <div style={{ float: 'right' }}>
                    {ResultatListe.highlightMatch(this.filtrer(kode), query)}
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

    const end = offset + q.length
    return (
      <React.Fragment>
        {navn.substring(0, offset)}
        <span style={{ color: 'black' }}>{navn.substring(offset, end)}</span>
        {navn.substring(end, navn.length)}
      </React.Fragment>
    )
  }
}

export default ResultatListe
