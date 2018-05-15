import React from 'react'
import Kartlagelement from './Kartlagelement'
import { Subheader } from 'material-ui'

const AktiveKartlag = ({
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
  return (
    koder && (
      <React.Fragment>
        <Subheader>{title}</Subheader>
        {koder.map(item => {
          const kode = item.kode
          return (
            <Kartlagelement
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
  )
}

export default AktiveKartlag
