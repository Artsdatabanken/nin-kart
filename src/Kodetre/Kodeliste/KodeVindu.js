import React from 'react'
import Kodelisteelement from './Kodelisteelement'
import Kodekort from './Kodekort'
import StatistikkContainer from '../Statistikk/StatistikkContainer'
import { Paper, List, Tabs, Tab } from 'material-ui'
import Relasjon from './Relasjon'
import FetchContainer from '../../FetchContainer'

function KodeVindu(props) {
  console.log(props.data)
  return (
    <FetchContainer>
      <Paper
        zDepth={4}
        style={{
          height: '100%',
          position: 'fixed',
          left: 0,
          top: 0,
          width: 416,
          overflow: 'auto',
        }}
      >
        {props.data && (
          <Kodekort
            {...props.meta}
            onGoToCode={props.onGoToCode}
            onAddLayer={props.onAddLayer}
            data={props.data}
          />
        )}
        <Tabs>
          <Tab label="Innhold">
            <List>
              {props.data &&
                props.data.barn &&
                props.data.barn.map(item => (
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
          <Tab label="Statistikk">
            <StatistikkContainer dataUrl={'/kode/' + props.data.kode} />
          </Tab>
          <Tab label="Relatert">
            <Relasjon relasjon={props.meta.relasjon} />
          </Tab>
        </Tabs>
      </Paper>
    </FetchContainer>
  )
}

export default KodeVindu
