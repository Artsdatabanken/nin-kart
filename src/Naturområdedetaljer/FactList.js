import React from 'react'
import { ListItem } from 'material-ui/List'

function FactList(props) {
  if (props.items)
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
  return null
}

export default FactList
