import { List, ListSubheader } from '@material-ui/core'
import React from 'react'
import { SettingsContext } from '../../SettingsContext'
import språk from '../../språk'
import Kodelisteelement from './Kodelisteelement'

class Kodeliste extends React.Component {
  render() {
    const {
      title,
      subtitle,
      størsteAreal,
      apidata,
      metadata,
      opplystKode,
      visKode,
    } = this.props

    if (!metadata) return null
    if (Object.keys(metadata) <= 0) return null
    return (
      <SettingsContext.Consumer>
        {context => (
          <List>
            <ListSubheader>{title}</ListSubheader>
            {subtitle && (
              <div
                style={{
                  padding: '0px 5px 0px 16px',
                  fontSize: '14px',
                  color: 'rgba(95, 95, 95, 0.54)',
                }}
              >
                {subtitle}
              </div>
            )}
            {Kodeliste.sorterNøkler(metadata, context.sorterPåKode).map(
              kode => {
                const apibarn = apidata
                  ? apidata[
                      apidata
                        .map(apiItem => {
                          return apiItem.kode
                        })
                        .indexOf(kode.toLowerCase())
                    ] || {}
                  : {}
                const metabarnet = metadata[kode]
                if (metabarnet.skjul) return null
                return (
                  <Kodelisteelement
                    key={kode}
                    kode={kode}
                    meta={metabarnet}
                    størsteAreal={størsteAreal}
                    areal={apibarn.areal}
                    visKode={visKode}
                    onGoToCode={this.onGoToCode}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    erOpplyst={opplystKode === kode}
                  />
                )
              }
            )}
          </List>
        )}
      </SettingsContext.Consumer>
    )
  }
  onGoToCode = kode => this.props.onGoToCode(kode)
  onMouseEnter = kode =>
    this.props.onMouseEnter && this.props.onMouseEnter(kode)
  onMouseLeave = () => this.props.onMouseLeave && this.props.onMouseLeave()
}

const nøkkel = (node, sorterPåKode) => {
  if (node.sortering) return node.sortering
  if (sorterPåKode) return node.sti.split(/\//).map(e => e.padStart(5, '0'))

  return språk(node.tittel)
}

Kodeliste.sorterNøkler = (barn, sorterPåKode) => {
  const sortert = Object.keys(barn).sort((a, b) => {
    return nøkkel(barn[a], sorterPåKode) >= nøkkel(barn[b], sorterPåKode)
      ? 1
      : -1
  })
  return sortert
}

export default Kodeliste
