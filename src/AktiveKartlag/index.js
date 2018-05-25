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
  onToggleVisible,
  onUpdateLayerProp,
  language,
}) => {
  koder.map(forelder => {
    forelder.barnArray = []
    if (forelder.barn) {
      Object.keys(forelder.barn).forEach(kode => {
        const item = forelder.barn[kode]
        item.kode = kode
        forelder.barnArray.push(item)
      })
    }
    return null
  })

  return (
    koder && (
      <React.Fragment key={title}>
        <Subheader>{title}</Subheader>
        {koder.map(forelder => {
          const kode = forelder.kode
          return (
            <React.Fragment key={kode}>
              <Kartlagelement
                meta={forelder}
                erEkspandert={kode === ekspandertKode}
                kode={kode}
                key={'valgt' + kode}
                vis={forelder.vis ? true : false}
                onGoToCode={onGoToCode}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClose={kode => onRemoveSelectedLayer(kode)}
                visHeleKoden={true}
                onUpdateLayerProp={onUpdateLayerProp}
                onShowColorpicker={kode => onShowColorpicker(kode)}
                onToggleVisible={kode => onToggleVisible(kode)}
                language={language}
              />
              {forelder.barnArray.map(item => {
                const kode = item.kode
                return (
                  <React.Fragment key={kode}>
                    <Kartlagelement
                      meta={item}
                      erEkspandert={kode === ekspandertKode}
                      kode={kode}
                      key={'valgt' + kode}
                      vis={item.vis ? true : false}
                      onGoToCode={onGoToCode}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                      visHeleKoden={true}
                      onUpdateLayerProp={onUpdateLayerProp}
                      onShowColorpicker={kode => onShowColorpicker(kode)}
                      onToggleVisible={kode => onToggleVisible(kode)}
                      showColor={onShowColorpicker}
                      language={language}
                    />
                  </React.Fragment>
                )
              })}
            </React.Fragment>
          )
        })}
      </React.Fragment>
    )
  )
}

export default AktiveKartlag
