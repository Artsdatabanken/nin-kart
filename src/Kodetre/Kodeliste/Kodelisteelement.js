import React from 'react'
import { Avatar } from 'material-ui'
import { ListItem } from 'material-ui/List'

class Kodelisteelement extends React.Component {
  render() {
    const item = this.props
    const meta = this.props.meta
    return (
      <ListItem
        key={item.kode}
        leftAvatar={
          <Avatar
            style={meta.utenRamme ? { borderRadius: 0 } : {}}
            color={meta.color}
            backgroundColor={meta.backgroundColor || '#00000000'}
            src={meta.avatarbilde}
          >
            {meta.kode}
          </Avatar>
        }
        primaryText={item.navn}
        secondaryText={item.kode}
        onClick={() => item.onGoToCode(item.kode)}
      />
    )
  }
}

export default Kodelisteelement
