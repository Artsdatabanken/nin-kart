import React from 'react'
import { ListItem } from 'material-ui/List'

function FactList(props) {
  return (
    <React.Fragment>
      {props.items.map(item => (
        <ListItem
          primaryText={item.primary}
          secondaryText={item.secondary}
          key={item.id}
          onClick={() => props.onClick(item.id)}
        />
      ))}
    </React.Fragment>
  )
}

export default FactList
