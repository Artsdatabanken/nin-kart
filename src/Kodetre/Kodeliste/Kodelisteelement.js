// @flow
import { ListItem } from 'material-ui/List'
import muiThemeable from 'material-ui/styles/muiThemeable'
import React from 'react'
import prettyprint from '../../prettyprint'
import språk from '../../språk'
import Kodetagg from '../Kodetagg'
import Bildeavatar from './Bildeavatar'
import PaintSwatch from './PaintSwatch'

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
            title={'areal: ' + prettyprint.prettyPrintAreal(areal)}
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
          {false && prettyprint.prettyPrintAreal(this.props.areal)}
        </div>
      </div>
    )
  }

  render() {
    const { meta, kode, avatarUtenRamme, areal } = this.props
    return (
      <ListItem
        innerDivStyle={{ backgroundColor: areal ? '' : '#DDDDDD' }}
        key={kode}
        onClick={() => this.props.onGoToCode(meta.sti)}
        onMouseEnter={() => this.props.onMouseEnter(kode)}
        onMouseLeave={() => this.props.onMouseLeave()}
        leftAvatar={<Bildeavatar utenRamme={avatarUtenRamme} kode={kode} />}
        primaryText={
          <div>
            {true && <Kodetagg hele={false} kode={kode.toUpperCase()} />}
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
            <PaintSwatch color={meta.farge} />
          </div>
        }
      />
    )
  }
}

export default muiThemeable()(Kodelisteelement)
