import React from 'react'
import Kodelisteelement from './Kodelisteelement'
import { Subheader } from 'material-ui'

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
      {Object.keys(metadata).map(item => {
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
