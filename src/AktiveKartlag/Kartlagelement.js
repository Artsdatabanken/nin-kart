import { FlatButton, ListItem } from 'material-ui'
import Toggle from 'material-ui/Toggle'
import muiThemeable from 'material-ui/styles/muiThemeable'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ActionInfo from 'material-ui/svg-icons/action/info'
import React from 'react'
import tinycolor from 'tinycolor2'
import Bildeavatar from '../Kodetre/Kodeliste/Bildeavatar'
import PaintSwatch from '../Kodetre/Kodeliste/PaintSwatch'
import Kodetagg from '../Kodetre/Kodetagg'
import PrettyPrint from '../prettyprint'
import språk from '../språk'
import ColorPicker from './ColorPicker'

class Kartlagelement extends React.Component {
  setFargeKode(kode, farge) {
    let farger = JSON.parse(localStorage.getItem('customColors') || '[]')
    farger = farger.filter(x => x.kode !== kode)
    farger.push({ kode: kode, farge: farge })
    localStorage.setItem('customColors', JSON.stringify(farger))
  }

  getFargeKode = () => {
    let kode = this.props.kode
    if (localStorage) {
      let customColors = localStorage.getItem('customColors')
      if (customColors) {
        let fargeElement = JSON.parse(customColors).filter(x => x.kode === kode)
        return fargeElement && fargeElement[0] && fargeElement[0].farge
          ? fargeElement[0].farge
          : this.props.meta.farge
      }
    }
    return this.props.meta.farge
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
    const { meta, kode, avatarUtenRamme, areal } = this.props
    const tittel = språk(meta.tittel)
    const farge = this.getFargeKode()
    return (
      <React.Fragment>
        <ListItem
          onClick={e => {
            e.stopPropagation()
            this.props.onShowColorpicker(meta.kode)
          }}
          innerDivStyle={{ backgroundColor: areal ? '' : '#DDDDDD' }}
          key={item.kode}
          onMouseEnter={() =>
            this.props.onMouseEnter && this.props.onMouseEnter(kode)
          }
          onMouseLeave={() => {
            this.props.onMouseLeave && this.props.onMouseLeave(kode)
          }}
          leftAvatar={<Bildeavatar utenRamme={avatarUtenRamme} kode={kode} />}
          primaryText={
            <div>
              {tittel}
              <br />
              <Kodetagg hele={true} kode={kode} />
            </div>
          }
          secondaryText={this.undertekst(
            this.props.størsteAreal,
            this.props.areal,
            this.props.antallNaturområder,
            meta.undertittel
          )}
          rightAvatar={
            this.props.showColor ? (
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
                      this.props.onToggleVisible(meta.kode)
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
                  <PaintSwatch color={farge} />
                </div>
              </div>
            ) : (
              <div />
            )
          }
        />
        {this.props.erEkspandert && (
          <div style={{ marginLeft: 56 }}>
            <ColorPicker
              style={{ display: 'fixed' }}
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
              onClick={() => this.props.onGoToCode(meta.sti)}
              icon={<ActionInfo />}
            />
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default muiThemeable()(Kartlagelement)
