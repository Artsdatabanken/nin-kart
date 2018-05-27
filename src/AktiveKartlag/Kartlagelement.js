import { ListItem } from 'material-ui'
import Toggle from 'material-ui/Toggle'
import muiThemeable from 'material-ui/styles/muiThemeable'
import React from 'react'
import { withRouter } from 'react-router'
import Bildeavatar from '../Kodetre/Kodeliste/Bildeavatar'
import PaintSwatch from '../Kodetre/Kodeliste/PaintSwatch'
import localStorageHelper from '../localStorageHelper'
import PrettyPrint from '../prettyprint'

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
    console.log(this.props.kode, this.props.farge)
    const item = this.props
    const { meta, farge, kode, avatarUtenRamme, areal } = this.props
    const tittel = språk(meta.tittel)
    return (
      <React.Fragment>
        <ListItem
          onClick={this.props.onClick}
          key={item.kode}
          onMouseEnter={() =>
            this.props.onMouseEnter && this.props.onMouseEnter(kode)
          }
          onMouseLeave={() => {
            this.props.onMouseLeave && this.props.onMouseLeave(kode)
          }}
          leftAvatar={<Bildeavatar utenRamme={avatarUtenRamme} kode={kode} />}
          primaryText={tittel}
          secondaryText={undertittel}
          rightAvatar={
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  position: 'absolute',
                  right: 40,
                  top: 8,
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
                  top: 8,
                }}
              >
                <PaintSwatch farge={farge} />
              </div>
            </div>
          }
        />
        {erEkspandert && (
          <div style={{ marginLeft: 24, marginBottom: 24 }}>
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
              onClick={() => this.props.history.replace(meta.sti)}
              icon={<ActionInfo />}
            />
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default muiThemeable()(withRouter(Kartlagelement))
