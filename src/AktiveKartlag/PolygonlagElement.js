import React from 'react'
import { withRouter } from 'react-router'
import språk from '../språk'
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
    const item = this.props
    const { tittel, kode } = this.props
    return (
      <KartlagElement
        {...this.props}
        key={item.kode}
        onMouseEnter={() =>
          this.props.onMouseEnter && this.props.onMouseEnter(kode)
        }
        onMouseLeave={() => {
          this.props.onMouseLeave && this.props.onMouseLeave(kode)
        }}
        tittel={språk(tittel)}
        undertittel={kode}
      />
    )
  }
}

export default withRouter(PolygonlagElement)
