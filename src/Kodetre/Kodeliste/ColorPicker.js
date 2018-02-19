import React from 'react'
import { CustomPicker } from 'react-color'
import { Alpha, Hue, Saturation } from 'react-color/lib/components/common'
import { Subheader } from 'material-ui'
import ChromePointer from 'react-color/lib/components/chrome/ChromePointer'
import ChromePointerCircle from 'react-color/lib/components/chrome/ChromePointerCircle'
class ColorPicker extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Subheader>Farge</Subheader>
        <Blokk height={256}>
          <Saturation
            pointer={ChromePointerCircle}
            style={{ height: 256 }}
            {...this.props}
          />
        </Blokk>
        <Blokk>
          <Hue pointer={ChromePointer} {...this.props} />
        </Blokk>
        <Blokk>
          <Alpha pointer={ChromePointer} {...this.props} />
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
      marginBottom: 16,
      marginTop: 16,
      height: height || 10,
      position: 'relative',
    }}
  >
    {children}
  </div>
)

export default CustomPicker(ColorPicker)
