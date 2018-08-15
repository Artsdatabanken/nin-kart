import { ListSubheader } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { withTheme } from '@material-ui/core/styles'
import ActionDelete from '@material-ui/icons/Delete'
import ActionInfo from '@material-ui/icons/Info'
import ZoomIn from '@material-ui/icons/ZoomIn'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import tinycolor from 'tinycolor2'
import språk from '../språk'
import ColorPicker from './ColorPicker'

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
      onFitBounds,
      kanSlettes,
    } = this.props
    return (
      <React.Fragment>
        <ListSubheader>{tittel ? språk(tittel) : 'Polygon'}</ListSubheader>
        {
          <ColorPicker
            color={farge}
            onChange={farge => {
              const rgbString = tinycolor(farge.rgb).toRgbString()
              onUpdateLayerProp(kode, 'farge', rgbString)
            }}
          />
        }

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
}

export default withRouter(withTheme()(Polygon))
