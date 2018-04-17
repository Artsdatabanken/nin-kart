import React from 'react'
import Kodelisteelement from './Kodelisteelement'
import { Subheader } from 'material-ui'

const ValgtListe = ({
  title,
  subtitle,
  koder,
  onGoToCode,
  onRemoveSelectedLayer,
  ekspandertKode,
  fjernKode,
  onMouseEnter,
  onMouseLeave,
  onShowColorpicker,
  onUpdateLayerProp,
  language,
}) => {
  if (!koder) return null
  return (
    <React.Fragment>
      <Subheader>{title}</Subheader>
      {koder.map(item => {
        const kode = item.kode
        return (
          <Kodelisteelement
            meta={item}
            erEkspandert={kode === ekspandertKode}
            kode={kode}
            key={'valgt' + kode}
            onGoToCode={onGoToCode}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClose={kode => onRemoveSelectedLayer(kode)}
            visHeleKoden={true}
            onUpdateLayerProp={onUpdateLayerProp}
            onShowColorpicker={kode => onShowColorpicker(kode)}
            showColor={onShowColorpicker}
            language={language}
          />
        )
      })}
    </React.Fragment>
  )
}

export default ValgtListe
