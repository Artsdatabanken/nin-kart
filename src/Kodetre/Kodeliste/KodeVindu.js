import React from 'react'
import Kodelisteelement from './Kodelisteelement'
import Kodekort from './Kodekort'
import StatistikkContainer from '../Statistikk/StatistikkContainer'
import { Paper, List, ListItem, Tabs, Tab } from 'material-ui'
import Relasjon from './Relasjon'
import FetchContainer from '../../FetchContainer'

const KodeVindu = props => {
  const selv = props.meta.selv || {}
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
            <div>{selv.ingress}</div>
            <List>
              {props.data &&
                props.data.barn &&
                props.data.barn.map(item => {
                  const barn = props.meta.barn || {}
                  const barnet = barn[item.kode] || {}
                  return (
                    <Kodelisteelement
                      key={item.kode}
                      {...item}
                      meta={barnet}
                      checked={props.isSelected(props.filterCode, item.kode)}
                      onGoToCode={props.onGoToCode}
                      hideCircle={selv.fristilAvatar}
                      ikon={selv.ikon}
                    />
                  )
                })}
            </List>
          </Tab>
          <Tab label="Informasjon">
            <StatistikkContainer
              ingress={props.meta.ingress}
              dataUrl={'/kode/' + props.data.kode}
            />
          </Tab>
          <Tab label="Se også">
            <Relasjon relasjon={props.meta.relasjon || []} />
          </Tab>
        </Tabs>
      </Paper>
    </FetchContainer>
  )
}

export default KodeVindu
