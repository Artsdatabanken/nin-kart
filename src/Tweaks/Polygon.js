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
import PolygonlagElement from '../AktiveKartlag/PolygonlagElement'
import ColorPicker from './ColorPicker'
import Veksle from './Veksle'

const Barneliste = ({ barn }) => {
  return Object.keys(barn).map(i => {
    const node = barn[i]
    return (
      <PolygonlagElement
        key={node.kode}
        kode={node.kode}
        erSynlig={node.erSynlig}
        tittel={node.tittel}
        undertittel={node.kode}
        farge={node.farge}
        onUpdateLayerProp={() => {}}
        onMouseLeave={() => {}}
        onMouseEnter={() => {}}
        onClick={() => {}}
      />
    )
  })
}
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
    } = this.props
    const undernivå = this.navnPåUndernivå(kode)
    return (
      <React.Fragment>
        <ListSubheader>{tittel}</ListSubheader>
        <Veksle
          tittel={'Vis ' + undernivå}
          toggled={visBarn}
          onClick={() => onUpdateLayerProp(kode, 'visBarn', !visBarn)}
        />
        <Veksle
          tittel="Vis Etiketter"
          toggled={visEtiketter}
          onClick={() => onUpdateLayerProp(kode, 'visEtiketter', !visEtiketter)}
        />
        {visBarn ? (
          <List>
            <ListSubheader style={{ textTransform: 'capitalize' }}>
              {undernivå}
            </ListSubheader>
            <Barneliste barn={barn} />
          </List>
        ) : (
          <ColorPicker
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
    if (!nivåer) return 'underelementer'
    return nivåer[0] + 'r'
  }
}

export default withRouter(withTheme()(Polygon))
