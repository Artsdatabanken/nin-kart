import React from 'react'
import Kodelisteelement from './Kodelisteelement'
import Kodekort from './Kodekort'
import StatistikkContainer from '../Statistikk/StatistikkContainer'
import { Paper, List, Subheader } from 'material-ui'
import FetchContainer from '../../FetchContainer'

const KodeVindu = props => {
  const selv = props.meta.selv || {}
  if (!props.data) return null
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
          <Subheader>Undernivå av {props.data.navn.toLowerCase()}</Subheader>
          <Kodeliste
            apidata={props.data}
            metadata={props.meta}
            onGoToCode={props.onGoToCode}
            onMouseEnter={props.onMouseEnter}
          />

          {false && (
            <React.Fragment>
              <Subheader>Diagnostiske arter</Subheader>
              <Kodeliste
                apidata={props.data}
                metadata={props.meta}
                onGoToCode={props.onGoToCode}
                onMouseEnter={props.onMouseEnter}
              />
            </React.Fragment>
          )}
          {false && (
            <React.Fragment>
              <Subheader>Om {props.data.navn.toLowerCase()}</Subheader>
              <StatistikkContainer
                ingress={props.meta.ingress}
                dataUrl={'/kode/' + props.data.kode}
              />
            </React.Fragment>
          )}
        </List>
      </Paper>
    </FetchContainer>
  )
}

const Kodeliste = ({ apidata, metadata, onGoToCode, onMouseEnter }) =>
  apidata.barn.map(item => {
    const metabarn = metadata.barn || {}
    const metabarnet = metabarn[item.kode] || {}
    return (
      <Kodelisteelement
        key={item.kode}
        {...item}
        meta={metabarnet}
        onGoToCode={onGoToCode}
        onMouseEnter={onMouseEnter}
      />
    )
  })

export default KodeVindu
