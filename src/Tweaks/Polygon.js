import Button from '@material-ui/core/Button'
import { withTheme } from '@material-ui/core/styles'
import ActionDelete from '@material-ui/icons/Delete'
import ActionInfo from '@material-ui/icons/Info'
import ZoomIn from '@material-ui/icons/ZoomIn'
import React, { Component } from 'react'
import tinycolor from 'tinycolor2'
import Overskrift from '../Overskrift'
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
        <Overskrift>
          {item && item.tittel ? språk(item.tittel) : 'Polygon'}
        </Overskrift>
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
              label="Fjern"
              color="primary"
              onClick={e => {
                if (item && item.kode) {
                  onRemove(item.kode)
                  onExitToRoot()
                }
              }}
              icon={<ActionDelete />}
            />
          )}

        {item &&
          item.sti && (
            <Button
              label="Info"
              color="primary"
              onClick={() => {
                if (item && item.sti) {
                  onGoToCode(item.sti)
                }
              }}
              icon={<ActionInfo />}
            />
          )}

        {item &&
          item.bbox && (
            <Button
              label={'Vis i kart'}
              color="primary"
              onClick={() => {
                if (item && item.bbox) {
                  onFitBounds(item.bbox)
                }
              }}
              icon={<ZoomIn />}
            />
          )}
      </React.Fragment>
    )
  }
}

export default withTheme()(Polygon)
