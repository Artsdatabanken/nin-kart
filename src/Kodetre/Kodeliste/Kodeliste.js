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
  apidata,
  metadata,
  onGoToCode,
  ekspandertKode,
  onMouseEnter,
  onMouseLeave,
  onShowColorpicker,
  onUpdateLayerProp,
}) => {
  if (!metadata) return null
  return (
    <React.Fragment>
      <Subheader>{title}</Subheader>
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
          />
        )
      })}
    </React.Fragment>
  )
}

export default Kodeliste
