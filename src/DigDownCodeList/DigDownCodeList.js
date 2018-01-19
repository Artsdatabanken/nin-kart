import React from 'react'
import { List, ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import Chip from 'material-ui/Chip'

function DigDownCodeList(props) {
  return (
    <List>
      {props.items.length ? (
        props.items.map(item => (
          <ListItem
            key={item.kode}
            primaryTogglesNestedList={true}
            rightAvatar={<Chip>{item.antall}</Chip>}
            primaryText={item.navn || item.scientificName}
            secondaryText={item.kode || item.popularName}
            onClick={() => props.onClick(item.kode)}
            leftCheckbox={
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

export default DigDownCodeList
