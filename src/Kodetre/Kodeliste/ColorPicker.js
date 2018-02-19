import React from 'react'
import { CustomPicker } from 'react-color'
import { Alpha, Hue } from 'react-color/lib/components/common'
import { ListItem } from 'material-ui'

class ColorPicker extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ListItem primaryText="Hue">
          <Alpha {...this.props} />
        </ListItem>
        <ListItem primaryText="Saturation">
          <div style={{ position: 'relative', width: 400, height: 200 }}>
            <Hue {...this.props} />
          </div>
        </ListItem>
      </React.Fragment>
    )
  }
}

export default CustomPicker(ColorPicker)
