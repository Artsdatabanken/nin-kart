import React from 'react'
import Kodelisteelement from './Kodelisteelement'
import Kodekort from './Kodekort'
import StatistikkContainer from '../Statistikk/StatistikkContainer'
import { Paper, List } from 'material-ui'
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
            data={props.data}
          />
        )}
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
                  onGoToCode={props.onGoToCode}
                  onMouseEnter={props.onMouseEnter}
                  hideCircle={selv.fristilAvatar}
                  ikon={selv.ikon}
                />
              )
            })}
        </List>
        {false && (
          <StatistikkContainer
            ingress={props.meta.ingress}
            dataUrl={'/kode/' + props.data.kode}
          />
        )}
      </Paper>
    </FetchContainer>
  )
}

export default KodeVindu
