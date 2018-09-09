import { Slider } from '@material-ui/lab'
import React from 'react'
import Innstilling from './Innstilling'

const SliderSetting = ({
  tittel,
  undertittel,
  disabled,
  icon,
  value,
  min,
  max,
  step,
  onChange,
}) => (
  <Innstilling
    tittel={tittel}
    undertittel={undertittel}
    icon={icon}
    disabled={disabled}
  >
    <Slider
      style={{ paddingTop: 0 }}
      disabled={disabled}
      min={min || 0}
      max={max || 1}
      step={step || 0.01}
      value={value}
      onChange={(event, value) => onChange(value)}
    />
  </Innstilling>
)
export default SliderSetting
