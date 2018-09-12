import { ListSubheader } from '@material-ui/core'
import React from 'react'
import { SettingsContext } from '../../SettingsContext'
import språk from '../../språk'
import Kodelisteelement from './Kodelisteelement'

const Kodeliste = ({
  title,
  subtitle,
  størsteAreal,
  apidata,
  metadata,
  onGoToCode,
  onMouseEnter,
  onMouseLeave,
  opplystKode,
  avatarUtenRamme,
  visKode,
}) => {
  if (!metadata) return null
  if (Object.keys(metadata) <= 0) return null
  return (
    <SettingsContext.Consumer>
      {context => (
        <React.Fragment>
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
          {Kodeliste.sorterNøkler(metadata, context.sorterPåKode).map(kode => {
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
                størsteAreal={størsteAreal}
                {...apibarn}
                kode={kode}
                visKode={visKode}
                meta={metabarnet}
                onGoToCode={onGoToCode}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                erOpplyst={kode === opplystKode}
              />
            )
          })}
        </React.Fragment>
      )}
    </SettingsContext.Consumer>
  )
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
