import { FlatButton } from 'material-ui'
import Toggle from 'material-ui/Toggle'
import muiThemeable from 'material-ui/styles/muiThemeable'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ActionInfo from 'material-ui/svg-icons/action/info'
import React from 'react'
import { withRouter } from 'react-router'
import tinycolor from 'tinycolor2'
import Bildeavatar from '../Kodetre/Kodeliste/Bildeavatar'
import PaintSwatch from '../Kodetre/Kodeliste/PaintSwatch'
import Kodetagg from '../Kodetre/Kodetagg'
import PrettyPrint from '../prettyprint'
import språk from '../språk'
import ColorPicker from './ColorPicker'
import KartlagElement from './Kartlagelement'

class PolygonlagElement extends React.Component {
  setFargeKode(kode, farge) {
    let farger = JSON.parse(localStorage.getItem('customColors') || '[]')
    farger = farger.filter(x => x.kode !== kode)
    farger.push({ kode: kode, farge: farge })
    localStorage.setItem('customColors', JSON.stringify(farger))
  }

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
              width: `${100.0 * areal / størsteAreal}%`,
            }}
            title={'areal: ' + PrettyPrint.prettyPrintAreal(areal)}
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
      sti,
    } = this.props
    return (
      <KartlagElement
        farge={farge}
        onClick={this.props.onClick}
        key={item.kode}
        erEkspandert={this.props.erEkspandert}
        onMouseEnter={() =>
          this.props.onMouseEnter && this.props.onMouseEnter(kode)
        }
        onMouseLeave={() => {
          this.props.onMouseLeave && this.props.onMouseLeave(kode)
        }}
        leftAvatar={<Bildeavatar utenRamme={avatarUtenRamme} kode={kode} />}
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
        rightAvatar={
          <div>
            <div
              style={{
                display: 'inline-flex',
                position: 'absolute',
                right: 40,
                top: 16,
              }}
            >
              <Toggle
                toggled={!this.props.skjul}
                onClick={e => {
                  e.stopPropagation()
                  this.props.onToggleVisible(kode)
                }}
              />
            </div>
            <div
              style={{
                display: 'inline-flex',
                position: 'absolute',
                right: 0,
                top: 16,
              }}
            >
              <PaintSwatch farge={farge} />
            </div>
          </div>
        }
      >
        <ColorPicker
          color={farge}
          onChange={farge => {
            const rgbString = tinycolor(farge.rgb).toRgbString()
            this.setFargeKode(item.kode, rgbString)
            this.props.onUpdateLayerProp(item.kode, 'farge', rgbString)
          }}
        />

        <FlatButton
          label="Fjern"
          primary={true}
          onClick={e => {
            this.props.onRemove(item.kode)
          }}
          icon={<ActionDelete />}
        />

        <FlatButton
          label="Info"
          primary={true}
          onClick={() => this.props.history.replace(sti)}
          icon={<ActionInfo />}
        />
      </KartlagElement>
    )
  }
}

export default muiThemeable()(withRouter(PolygonlagElement))
