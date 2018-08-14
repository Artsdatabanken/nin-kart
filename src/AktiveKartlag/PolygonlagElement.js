import React from 'react'
import { withRouter } from 'react-router'
import Kodetagg from '../Kodetre/Kodetagg'
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
    const {
      farge,
      tittel,
      undertittel,
      kode,
      avatarUtenRamme,
      rightIcon,
    } = this.props
    return (
      <KartlagElement
        farge={farge}
        avatarUtenRamme={avatarUtenRamme}
        onClick={this.props.onClick}
        key={item.kode}
        kode={item.kode}
        rightIcon={rightIcon}
        erEkspandert={this.props.erEkspandert}
        onMouseEnter={() =>
          this.props.onMouseEnter && this.props.onMouseEnter(kode)
        }
        onMouseLeave={() => {
          this.props.onMouseLeave && this.props.onMouseLeave(kode)
        }}
        vis={this.props.vis}
        indent={this.props.indent}
        tittel={
          <div>
            {språk(tittel)}
            <br />
            <Kodetagg hele={true} kode={kode} />
          </div>
        }
        undertittel={this.undertekst(
          this.props.størsteAreal,
          this.props.areal,
          this.props.antallNaturområder,
          undertittel
        )}
      />
    )
  }
}

export default withRouter(PolygonlagElement)
