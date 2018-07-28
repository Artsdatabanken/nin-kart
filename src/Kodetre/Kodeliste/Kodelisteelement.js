// @flow
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@material-ui/core'
import ListItemText from '@material-ui/core/ListItemText'
import { withTheme } from '@material-ui/core/styles'
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
  theme: Object,
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
              width: `${(100.0 * areal) / størsteAreal}%`,
              backgroundColor: this.props.theme.palette.secondary.main,
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
      >
        <ListItemIcon>
          <Bildeavatar utenRamme={avatarUtenRamme} kode={kode} />
        </ListItemIcon>
        <ListItemSecondaryAction>
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
        </ListItemSecondaryAction>
        <ListItemText
          primary={
            <div>
              {true && <Kodetagg hele={false} kode={kode.toUpperCase()} />}
              {språk(meta.tittel)}
              <div style={{ display: 'inline-flex' }} />
            </div>
          }
          secondary={this.undertekst(
            this.props.størsteAreal,
            this.props.areal,
            this.props.antallNaturområder,
            meta.undertittel
          )}
        />
      </ListItem>
    )
  }
}

export default withTheme()(Kodelisteelement)
