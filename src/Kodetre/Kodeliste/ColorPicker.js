import React from 'react'
import { CustomPicker } from 'react-color'
import { Alpha, Hue, Saturation } from 'react-color/lib/components/common'
import { Subheader } from 'material-ui'

class ColorPicker extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Subheader>Farge</Subheader>
        <Blokk>
          <Hue {...this.props} />
        </Blokk>
        <Subheader>Metning</Subheader>
        <Blokk height={256}>
          <Saturation style={{ height: 256 }} {...this.props} />
        </Blokk>
        <Subheader>Gjennomsiktighet</Subheader>
        <Blokk>
          <Alpha {...this.props} />
        </Blokk>
      </React.Fragment>
    )
  }
}

const Blokk = ({ height, children }) => (
  <div
    style={{
      marginLeft: 16,
      marginRight: 16,
      height: height || 10,
      position: 'relative',
    }}
  >
    {children}
  </div>
)

export default CustomPicker(ColorPicker)
