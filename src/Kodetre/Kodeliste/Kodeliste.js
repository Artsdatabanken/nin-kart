import React from 'react'
import { List, ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import Chip from 'material-ui/Chip'

function Kodeliste(props) {
  console.log(props)
  return (
    <List>
      {props.items.length ? (
        props.items.map(item => (
          <ListItem
            key={item.kode}
            primaryTogglesNestedList={true}
            rightAvatar={<Chip>{item.antall}</Chip>}
            primaryText={item.navn}
            secondaryText={item.kode}
            onClick={() => props.onClick(item.kode)}
            leftAvatar={
              <Checkbox
                key={item.kode}
                name={'' + item.kode}
                alt={props.filterCode}
                onClick={props.onCheck}
                checked={props.isSelected(props.filterCode, item.kode)}
              />
            }
          />
        ))
      ) : (
        <ListItem primarytext={'Ingen underkategorier'} />
      )}
    </List>
  )
}

export default Kodeliste
