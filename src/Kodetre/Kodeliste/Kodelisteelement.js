import React from 'react'
import { Avatar } from 'material-ui'
import { ListItem } from 'material-ui/List'

class Kodelisteelement extends React.Component {
  render() {
    const item = this.props
    const meta = this.props.meta
    const avatarStyle = this.props.hideCircle ? { borderRadius: 0 } : {}
    return (
      <ListItem
        key={item.kode}
        leftAvatar={
          this.props.ikon === 'text' ? (
            <Avatar
              color={meta.color}
              backgroundColor={meta.backgroundColor}
              size={30}
            >
              {meta.kode}
            </Avatar>
          ) : (
            meta.image && (
              <Avatar
                style={avatarStyle}
                backgroundColor="#00000000"
                src={meta.image}
              />
            )
          )
        }
        primaryText={item.navn}
        secondaryText={item.kode}
        onClick={() => item.onGoToCode(item.kode)}
      />
    )
  }
}

export default Kodelisteelement
