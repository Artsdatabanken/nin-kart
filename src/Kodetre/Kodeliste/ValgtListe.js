import React from 'react'
import Kodelisteelement from './Kodelisteelement'
import { Subheader } from 'material-ui'

const ValgtListe = ({
  title,
  subtitle,
  koder,
  onGoToCode,
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
        const kode = item[0].kode
        return (
          <Kodelisteelement
            meta={item[0]}
            kode={kode}
            key={kode}
            onGoToCode={onGoToCode}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onUpdateLayerProp={onUpdateLayerProp}
            onShowColorpicker={() => onShowColorpicker(kode)}
            showColor={onShowColorpicker}
            language={language}
          />
        )
      })}
    </React.Fragment>
  )
}

export default ValgtListe
