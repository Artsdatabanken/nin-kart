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
      {Kodeliste.sorterNøkler(metadata).map(item => {
        const apibarn = apidata
          ? apidata[
              apidata
                .map(apiItem => {
                  return apiItem.kode
                })
                .indexOf(item)
            ] || {}
          : {}
        const metabarnet = metadata[item] || {}
        const kode = item.toString()
        return (
          <Kodelisteelement
            kode={kode}
            key={kode}
            subkode={item}
            størsteAreal={størsteAreal}
            {...apibarn}
            meta={metabarnet}
            erEkspandert={kode === ekspandertKode}
            onGoToCode={onGoToCode}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onUpdateLayerProp={onUpdateLayerProp}
            onShowColorpicker={() => onShowColorpicker(kode)}
            showColor={onShowColorpicker}
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
  const f = e.map(e => {
    if (e && e.toString() && e.toString().padStart)
      return e.toString().padStart(5, '0')
    return ''
  })
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
