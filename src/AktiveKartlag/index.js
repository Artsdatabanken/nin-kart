import { FlatButton, Subheader } from 'material-ui'
import MapsLayers from 'material-ui/svg-icons/maps/layers'
import React from 'react'
import { withRouter } from 'react-router'
import Kartlagelement from './Kartlagelement'
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
  history,
}) => {
  return (
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
            skjul={item.skjul}
            onGoToCode={onGoToCode}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClose={kode => onRemoveSelectedLayer(kode)}
            visHeleKoden={true}
            onUpdateLayerProp={onUpdateLayerProp}
            onShowColorpicker={kode => onShowColorpicker(kode)}
            onToggleVisible={kode => onToggleVisible(kode)}
            showColor={onShowColorpicker}
            language={language}
          />
        )
      })}
      <FlatButton
        style={{ margin: 24 }}
        label="Katalog"
        labelPosition="before"
        primary={true}
        icon={<MapsLayers />}
        onClick={() => history.replace('/katalog/')}
      />
    </React.Fragment>
  )
}

export default withRouter(AktiveKartlag)
