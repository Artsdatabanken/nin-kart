import muiThemeable from 'material-ui/styles/muiThemeable'
import React, { Component } from 'react'
import Overskrift from './Overskrift'
import ColorPicker from './ColorPicker'
import { FlatButton } from 'material-ui'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ActionInfo from 'material-ui/svg-icons/action/info'
import tinycolor from 'tinycolor2'
import språk from '../språk'

class Polygon extends Component {
  render() {
    const { onRemove, item, farge, onGoToCode, onExitToRoot } = this.props
    return (
      <React.Fragment>
        {!item && onExitToRoot && onExitToRoot()}
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
            <FlatButton
              label="Fjern"
              primary={true}
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
            <FlatButton
              label="Info"
              primary={true}
              onClick={() => {
                if (item && item.sti) {
                  onGoToCode(item.sti)
                }
              }}
              icon={<ActionInfo />}
            />
          )}
      </React.Fragment>
    )
  }
}

export default muiThemeable()(Polygon)
