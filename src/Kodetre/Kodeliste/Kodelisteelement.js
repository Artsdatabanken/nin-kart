import React from 'react'
import { Avatar } from 'material-ui'
import { ListItem } from 'material-ui/List'

const metaDefault = {}

class Kodelisteelement extends React.Component {
  render() {
    const item = this.props
    const meta = this.props.meta || metaDefault
    return (
      <ListItem
        key={item.kode}
        leftAvatar={
          meta.image && <Avatar backgroundColor="#00000000" src={meta.image} />
        }
        rightAvatar=""
        primaryText={item.navn}
        secondaryText={item.kode}
        onClick={() => item.onClick(item.kode)}
      />
    )
  }
}

export default Kodelisteelement
