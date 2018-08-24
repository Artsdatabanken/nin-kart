import React from 'react'
import { withRouter } from 'react-router'
import KartlagElement from './Kartlagelement'

class PolygonlagElement extends React.Component {
  undertekst(størsteAreal, areal, antall, undertittel) {
    if (undertittel) return undertittel.nb
    if (!areal) areal = 0
    if (!størsteAreal) størsteAreal = 1
    return (
      <div>
        <div
          style={{
            position: 'relative',
            width: 200,
          }}
        >
          <div
            className="sizebar"
            style={{
              marginTop: 4,
              float: 'left',
              height: 4,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              width: `${(100.0 * areal) / størsteAreal}%`,
            }}
          />
        </div>
        <div
          style={{
            display: 'inline',
            position: 'absolute',
            right: 52,
            float: 'right',
          }}
        />
      </div>
    )
  }

  render() {
    const {
      tittel,
      erSynlig,
      farge,
      kode,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onUpdateLayerProp,
    } = this.props
    return (
      <KartlagElement
        tittel={tittel}
        undertittel={this.props.kode}
        erSynlig={erSynlig}
        farge={farge}
        kode={kode}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onUpdateLayerProp={onUpdateLayerProp}
      />
    )
  }
}

export default withRouter(PolygonlagElement)
