import React from 'react'
import { List } from 'material-ui/List'
import Kodelisteelement from './Kodelisteelement'
import meta from '../../data/kode/NA.json'

function Kodeliste(props) {
  return (
    <List>
      {props.items.map(item => (
        <Kodelisteelement
          key={item.kode}
          {...item}
          meta={meta[item.kode]}
          checked={props.isSelected(props.filterCode, item.kode)}
          onClick={props.onClick}
        />
      ))}
    </List>
  )
}

export default Kodeliste
