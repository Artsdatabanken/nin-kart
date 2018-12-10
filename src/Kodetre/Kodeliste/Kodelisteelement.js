// @flow
import { ListItem, Typography, ListItemText } from '@material-ui/core'
import React from 'react'
import språk from '../../språk'
import Bildeavatar from './Bildeavatar'
import VolumIndikator from './VolumIndikator'
//import Arealbruksintensitet from './Filter/Arealbruksintensitet'
type State = {}

type Props = {
  kode: string,
  visKode: Boolean,
  meta: Object,
  størsteAreal: number,
  areal: number,
  onMouseLeave: Function,
  onMouseEnter: Function,
  onChange: Function,
  onGoToCode: Function,
  erOpplyst: Boolean,
  utenFarge: Boolean,
}

class Kodelisteelement extends React.Component<Props, State> {
  shouldComponentUpdate(np) {
    if (np.areal !== this.props.areal) return true
    if (np.value !== this.props.value) return true
    if (np.erOpplyst !== this.props.erOpplyst) return true
    return false
  }

  render() {
    const {
      meta,
      kode,
      erOpplyst,
      visKode,
      onGoToCode,
      onMouseEnter,
      onMouseLeave,
      areal,
      størsteAreal,
    } = this.props
    console.log('kode', kode, meta)
    return (
      <React.Fragment>
        <ListItem
          dense={true}
          key={kode}
          onClick={() => onGoToCode(kode)}
          onMouseEnter={() => onMouseEnter && onMouseEnter(kode)}
          onMouseLeave={() => onMouseLeave && onMouseLeave(kode)}
          button={true}
        >
          <VolumIndikator størsteAreal={størsteAreal} areal={areal} />
          {true && (
            <Bildeavatar
              kode={kode}
              farge={erOpplyst ? '#a00' : meta.farge}
              size="small"
            />
          )}
          <ListItemText style={{ width: '50%' }} primary={språk(meta.tittel)} />
          {visKode && (
            <Typography variant="caption" noWrap>
              {kode}
            </Typography>
          )}
        </ListItem>
        {/*kode === 'LA-KLG-AI' && (
          <ListItem>
            <Arealbruksintensitet value={meta.value} onChange={onChange} />
          </ListItem>
        )*/}
      </React.Fragment>
    )
  }
}

export default Kodelisteelement
