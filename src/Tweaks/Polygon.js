import { ListSubheader } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { withTheme } from '@material-ui/core/styles'
import ActionDelete from '@material-ui/icons/Delete'
import ActionInfo from '@material-ui/icons/Info'
import ZoomIn from '@material-ui/icons/ZoomIn'
import React, { Component } from 'react'
import tinycolor from 'tinycolor2'
import språk from '../språk'
import ColorPicker from './ColorPicker'

class Polygon extends Component {
  render() {
    const {
      onRemove,
      item,
      farge,
      onGoToCode,
      onExitToRoot,
      onFitBounds,
    } = this.props
    return (
      <React.Fragment>
        <ListSubheader>
          {item && item.tittel ? språk(item.tittel) : 'Polygon'}
        </ListSubheader>
        {item &&
          item.kode && (
            <ColorPicker
              color={farge}
              onChange={farge => {
                const rgbString = tinycolor(farge.rgb).toRgbString()
                this.props.setFargeKode(item.kode, rgbString)
              }}
            />
          )}

        {item &&
          item.removable && (
            <Button
              color="primary"
              onClick={e => {
                if (item && item.kode) {
                  onRemove(item.kode)
                  onExitToRoot()
                }
              }}
              icon={<ActionDelete />}
            >
              Fjern
            </Button>
          )}

        {item &&
          item.sti && (
            <Button
              color="primary"
              onClick={() => {
                if (item && item.sti) {
                  onGoToCode(item.sti)
                }
              }}
              icon={<ActionInfo />}
            >
              Info
            </Button>
          )}

        {item &&
          item.bbox && (
            <Button
              color="primary"
              onClick={() => {
                if (item && item.bbox) {
                  onFitBounds(item.bbox)
                }
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

export default withTheme()(Polygon)
