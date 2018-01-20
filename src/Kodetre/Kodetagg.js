import React from 'react'
import { Avatar, Chip } from 'material-ui'

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    padding: 2,
    display: 'flex',
    flexWrap: 'wrap',
  },
}

class Kodetagg extends React.Component {
  render() {
    const { kode, navn, backgroundColor, color } = this.props
    return (
      <div style={styles.wrapper}>
        <Chip styles={styles.chip}>
          <Avatar backgroundColor={backgroundColor} color={color} size={32}>
            <b>{kode}</b>
          </Avatar>
          {navn}
        </Chip>
      </div>
    )
  }
}

export default Kodetagg
