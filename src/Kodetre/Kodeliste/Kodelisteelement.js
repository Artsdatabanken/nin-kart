// @flow
import React from 'react'
import { ListItem } from 'material-ui/List'
import Kodetagg from '../Kodetagg'
import PaintSwatch from './PaintSwatch'
import Bildeavatar from './Bildeavatar'
import muiThemeable from 'material-ui/styles/muiThemeable'
import språk from '../../språk'

type State = {}

type Props = {
  kode: string,
  meta: Object,
  avatarUtenRamme: Boolean,
  størsteAreal: number,
  areal: number,
  antallNaturområder: number,
  muiTheme: Object,
  onMouseLeave: Function,
  onMouseEnter: Function,
  onGoToCode: Function,
}

class Kodelisteelement extends React.Component<Props, State> {
  getFargeKode = () => {
    let kode = this.props.kode
    if (localStorage) {
      let customColors = localStorage.getItem('customColors')
      if (customColors) {
        let fargeElement = JSON.parse(customColors).filter(
          x => x.kode.toLowerCase() === kode.toLowerCase()
        )
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
              backgroundColor: this.props.muiTheme.palette.accent3Color,
            }}
            title={'areal: ' + this.prettyPrintAreal(areal)}
          />
        </div>
        <div
          style={{
            display: 'inline',
            position: 'absolute',
            right: 52,
            float: 'right',
          }}
        >
          {false && this.prettyPrintAreal(this.props.areal)}
        </div>
      </div>
    )
  }

  prettyPrintAreal(areal) {
    if (!areal) return ''
    if (areal < 1000) return (Number(areal) / 1000).toFixed(0) + ' m²'
    areal /= 1000
    if (areal < 1000) return Number(areal).toFixed(0) + ' km²'
    return Number(areal / 1000).toFixed(0) + "' km²"
  }

  render() {
    const item = this.props
    const { meta, kode, avatarUtenRamme, areal } = this.props

    return (
      <ListItem
        innerDivStyle={{ backgroundColor: areal ? '' : '#DDDDDD' }}
        key={item.kode}
        onClick={() => this.props.onGoToCode(meta.sti)}
        onMouseEnter={() => this.props.onMouseEnter(kode)}
        onMouseLeave={() => this.props.onMouseLeave()}
        leftAvatar={<Bildeavatar utenRamme={avatarUtenRamme} kode={kode} />}
        primaryText={
          <div>
            {true && <Kodetagg hele={false} kode={kode} />}
            {språk(meta.tittel)}
            <div style={{ display: 'inline-flex' }} />
          </div>
        }
        secondaryText={this.undertekst(
          this.props.størsteAreal,
          this.props.areal,
          this.props.antallNaturområder,
          meta.undertittel
        )}
        rightAvatar={
          <div
            style={{
              display: 'inline-flex',
              position: 'absolute',
              top: 24,
              right: 24,
            }}
          >
            <PaintSwatch color={this.getFargeKode()} />
          </div>
        }
      />
    )
  }
}

export default muiThemeable()(Kodelisteelement)
