import React from 'react'
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'

class Kodelisteelement extends React.Component {
  render() {
    const item = this.props
    const meta = this.props.meta
    return (
      <ListItem
        key={item.kode}
        leftAvatar={meta && meta.image && <Avatar src={meta.image} />}
        rightAvatar=""
        primaryText={item.navn}
        secondaryText={item.kode}
        onClick={() => item.onClick(item.kode)}
      />
    )
  }
}

export default Kodelisteelement
