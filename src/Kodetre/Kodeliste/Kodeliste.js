import React from 'react'
import Kodelisteelement from './Kodelisteelement'
import { Subheader } from 'material-ui'

const Kodeliste = ({
  title,
  subtitle,
  størsteAreal,
  apidata,
  metadata,
  onGoToCode,
  ekspandertKode,
  onMouseEnter,
  onMouseLeave,
  onShowColorpicker,
  onUpdateLayerProp,
  language,
  avatarUtenRamme,
}) => {
  if (!metadata) return null
  return (
    <React.Fragment>
      <Subheader>{title}</Subheader>
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
      {Kodeliste.sorterNøkler(metadata).map(key => {
        const apibarn = apidata
          ? apidata[
              apidata
                .map(apiItem => {
                  return apiItem.kode
                })
                .indexOf(key)
            ] || {}
          : {}
        const metabarnet = metadata[key] || {}
        return (
          <Kodelisteelement
            kode={key}
            key={key}
            subkode={key}
            størsteAreal={størsteAreal}
            {...apibarn}
            meta={metabarnet}
            erEkspandert={key === ekspandertKode}
            onGoToCode={onGoToCode}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onUpdateLayerProp={onUpdateLayerProp}
            onShowColorpicker={() => onShowColorpicker(key)}
            language={language}
            avatarUtenRamme={avatarUtenRamme}
          />
        )
      })}
    </React.Fragment>
  )
}

const pad = sti => {
  // t/4 => 0000t0004
  if (!sti) return ''
  const e = sti.split(/\//)
  if (!e) return ''
  const f = e.map(e => (e || '').padStart(5, '0'))
  return f.join()
}

Kodeliste.sorterNøkler = metadata => {
  const sortert = Object.keys(metadata).sort((a, b) => {
    const ma = metadata[a]
    const mb = metadata[b]
    if (ma.sortering && mb.sortering)
      return ma.sortering > mb.sortering ? 1 : -1
    return pad(ma.sti) >= pad(mb.sti) ? 1 : -1
  })
  return sortert
}

export default Kodeliste
