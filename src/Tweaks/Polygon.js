import typesystem from '@artsdatabanken/typesystem'
import { List, ListSubheader } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { withTheme } from '@material-ui/core/styles'
import ActionDelete from '@material-ui/icons/Delete'
import ActionInfo from '@material-ui/icons/Info'
import ZoomIn from '@material-ui/icons/ZoomIn'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import tinycolor from 'tinycolor2'
import Barneliste from './Barneliste'
import ColorPicker from './ColorPicker'
import Veksle from './Veksle'

class Polygon extends Component {
  render() {
    const {
      onRemoveSelectedLayer,
      kode,
      farge,
      history,
      tittel,
      onUpdateLayerProp,
      bbox,
      visEtiketter,
      onFitBounds,
      kanSlettes,
      barn,
      visBarn,
      lag,
    } = this.props
    const undernivå = this.navnPåUndernivå(kode)
    return (
      <React.Fragment>
        <ListSubheader>{tittel}</ListSubheader>
        <Veksle
          tittel="Vis etiketter"
          toggled={visEtiketter}
          onClick={() => onUpdateLayerProp(kode, 'visEtiketter', !visEtiketter)}
        />
        <Veksle
          tittel={'Vis ' + undernivå}
          toggled={visBarn}
          onClick={() => onUpdateLayerProp(kode, 'visBarn', !visBarn)}
        />
        {visBarn ? (
          <List>
            <ListSubheader style={{ textTransform: 'capitalize' }}>
              {undernivå}
            </ListSubheader>
            <Barneliste
              forelderkode={kode}
              aktivtBarn={lag}
              barn={barn}
              onUpdateLayerProp={(index, felt, verdi) => {
                barn[index][felt] = verdi
                onUpdateLayerProp(kode, 'barn', barn)
              }}
            />
          </List>
        ) : (
          <ColorPicker
            tittel={'Fyllfarge'}
            color={farge}
            onChange={farge => {
              const rgbString = tinycolor(farge.rgb).toRgbString()
              onUpdateLayerProp(kode, 'farge', rgbString)
            }}
          />
        )}
        {kanSlettes && (
          <Button
            color="primary"
            onClick={e => {
              onRemoveSelectedLayer(kode)
            }}
            icon={<ActionDelete />}
          >
            Fjern
          </Button>
        )}
        <Button
          color="primary"
          onClick={() => {
            history.push('/katalog/' + kode)
          }}
          icon={<ActionInfo />}
        >
          Info
        </Button>
        {bbox && (
          <Button
            color="primary"
            onClick={() => {
              onFitBounds(bbox)
            }}
            icon={<ZoomIn />}
          >
            Vis i kart
          </Button>
        )}
      </React.Fragment>
    )
  }

  navnPåUndernivå(kode) {
    const nivåer = typesystem.hentNivaa(kode + '-1')
    if (nivåer.length <= 0) return 'underelementer'
    const nivå = nivåer[0]
    return nivå.endsWith('e') ? nivå + 'r' : nivå
  }
}

export default withRouter(withTheme()(Polygon))
