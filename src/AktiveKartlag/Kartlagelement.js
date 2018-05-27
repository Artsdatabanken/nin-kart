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
import localStorageHelper from '../localStorageHelper'
import PrettyPrint from '../prettyprint'
import språk from '../språk'
import ColorPicker from './ColorPicker'

class Kartlagelement extends React.Component {
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
                  <PaintSwatch color={meta.farge} />
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
              color={meta.farge}
              onChange={farge => {
                const rgbString = tinycolor(farge.rgb).toRgbString()
                localStorageHelper.settFargeKode(item.kode, rgbString)
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
