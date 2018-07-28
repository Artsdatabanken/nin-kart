import React from 'react'
import { CustomPicker } from 'react-color'
import ChromePointer from 'react-color/lib/components/chrome/ChromePointer'
import ChromePointerCircle from 'react-color/lib/components/chrome/ChromePointerCircle'
import { Alpha, Hue, Saturation } from 'react-color/lib/components/common'
import Overskrift from '../Overskrift'

class ColorPicker extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Overskrift>Farge</Overskrift>
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
      height: height || 10,
      position: 'relative',
    }}
  >
    {children}
  </div>
)

export default CustomPicker(ColorPicker)
