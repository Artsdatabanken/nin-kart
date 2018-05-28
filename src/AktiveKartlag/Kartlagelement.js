import { ListItem } from 'material-ui'
import Toggle from 'material-ui/Toggle'
import muiThemeable from 'material-ui/styles/muiThemeable'
import React from 'react'
import { withRouter } from 'react-router'
import Bildeavatar from '../Kodetre/Kodeliste/Bildeavatar'
import PaintSwatch from '../Kodetre/Kodeliste/PaintSwatch'
import PrettyPrint from '../prettyprint'

class Kartlagelement extends React.Component {
  getFargeKode = () => {
    let kode = this.props.kode
    if (localStorage) {
      let customColors = localStorage.getItem('customColors')
      if (customColors) {
        let fargeElement = JSON.parse(customColors).filter(x => x.kode === kode)
        if (fargeElement && fargeElement[0] && fargeElement[0].farge)
          return fargeElement[0].farge
      }
    }
    return this.props.farge
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
      tittel,
      undertittel,
      kode,
      erEkspandert,
      avatarUtenRamme,
    } = this.props
    const farge = this.getFargeKode()
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
            this.props.showColor || this.props.onToggleVisible ? (
              <div>
                {this.props.onToggleVisible && (
                  <div
                    style={{
                      display: 'inline-flex',
                      position: 'absolute',
                      right: 40,
                      top: 8,
                    }}
                  >
                    <Toggle
                      toggled={this.props.vis}
                      onClick={e => {
                        e.stopPropagation()
                        this.props.onToggleVisible(kode)
                      }}
                    />
                  </div>
                )}
                {this.props.showColor && (
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
                )}
              </div>
            ) : (
              <div />
            )
          }
        />
        {erEkspandert && (
          <div style={{ marginLeft: 24, marginBottom: 24 }}>
            {this.props.children}
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default muiThemeable()(withRouter(Kartlagelement))
