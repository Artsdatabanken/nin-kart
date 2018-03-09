import React from 'react'
import Kodelisteelement from './Kodelisteelement'
import { Subheader } from 'material-ui'

function sort(metadata) {
  return Object.keys(metadata).sort((a, b) => {
    const ma = metadata[a]
    const mb = metadata[b]
    if (ma.sortering && mb.sortering) return ma.sortering > mb.sortering
    return ma.kode > mb.kode
  })
}

const Kodeliste = ({
  title,
  subtitle,
  apidata,
  metadata,
  onGoToCode,
  ekspandertKode,
  onMouseEnter,
  onMouseLeave,
  onShowColorpicker,
  onUpdateLayerProp,
  language,
}) => {
  if (!metadata) return null
  return (
    <React.Fragment>
      <Subheader>{title}</Subheader>
      {subtitle && (
        <div
          style={{
            padding: '0px 5px 0px 16px',
            'font-size': '14px',
            color: 'rgba(95, 95, 95, 0.54)',
          }}
        >
          {subtitle}
        </div>
      )}
      {sort(metadata).map(item => {
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
            {...apibarn}
            meta={metabarnet}
            erEkspandert={kode === ekspandertKode}
            onGoToCode={onGoToCode}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onUpdateLayerProp={onUpdateLayerProp}
            onShowColorpicker={() => onShowColorpicker(kode)}
            language={language}
          />
        )
      })}
    </React.Fragment>
  )
}

export default Kodeliste
