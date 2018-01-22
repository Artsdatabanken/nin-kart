import React from 'react'
import { List } from 'material-ui/List'
import Kodelisteelement from './Kodelisteelement'
import Kodekort from './Kodekort'
import { Tabs, Tab } from 'material-ui/Tabs'
import Relasjon from './Relasjon'

function Kodeliste(props) {
  return (
    <div style={{ maxWidth: '500px' }}>
      <Kodekort {...props.meta} onGoToCode={props.onGoToCode} />
      <Tabs>
        <Tab label="Underkoder">
          <List>
            {props.items.map(item => (
              <Kodelisteelement
                key={item.kode}
                {...item}
                meta={props.meta.barn[item.kode] || {}}
                checked={props.isSelected(props.filterCode, item.kode)}
                onGoToCode={props.onGoToCode}
                hideCircle={props.meta.selv.fristilAvatar}
                ikon={props.meta.selv.ikon}
              />
            ))}
          </List>
        </Tab>
        <Tab label="Statistikk">følg med her...</Tab>
        <Tab label="Relatert">
          <Relasjon relasjon={props.meta.relasjon} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default Kodeliste
