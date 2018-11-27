import { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

import { Typography } from '@material-ui/core'
import React, { Component } from 'react'

class Filter extends Component {
  render() {
    const { value, icons, children, onChange } = this.props
    const marks = { [value[0]]: value[0], [value[1]]: value[1] }
    const [LeftIcon, RightIcon] = icons
    return (
      <div style={{ width: '100%', paddingBottom: 16 }}>
        {false && <Typography variant="subtitle1">{children}</Typography>}
        <div
          style={{
            display: 'flex',
            color: 'rgba(0,0,0,0.4)',
          }}
        >
          <div style={{ paddingRight: 16 }}>
            <LeftIcon />
          </div>
          <Range
            style={{ padding: 8 }}
            value={value}
            onChange={onChange}
            marks={marks}
          />
          <div style={{ paddingLeft: 16 }}>
            <RightIcon />
          </div>
        </div>
      </div>
    )
  }
}

export default Filter
