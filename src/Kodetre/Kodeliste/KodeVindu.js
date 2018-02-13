import React from 'react'
import Kodelisteelement from './Kodelisteelement'
import Kodekort from './Kodekort'
import StatistikkContainer from '../Statistikk/StatistikkContainer'
import { Paper, List, ListItem, Subheader } from 'material-ui'
import FetchContainer from '../../FetchContainer'

const KodeVindu = props => {
  const selv = props.meta.selv || {}
  const navn = (selv.navn || props.data.navn || ' type').toLowerCase() // TODO: navn i meta
  //if (!props.data) return null
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
        {props.meta && (
          <Kodekort
            {...props.meta}
            onGoToCode={props.onGoToCode}
            data={props.data}
          />
        )}
        <ListItem primaryText={props.meta.ingress} />
        <List>
          <Kodeliste
            title={`Undernivåer av ${navn}`}
            apidata={props.data.barn}
            metadata={props.meta.barn}
            onGoToCode={props.onGoToCode}
            onMouseEnter={props.onMouseEnter}
          />

          {false && (
            <React.Fragment>
              <Kodeliste
                title={`Diagnostiske arter`}
                apidata={props.data.barn}
                metadata={props.meta}
                onGoToCode={props.onGoToCode}
                onMouseEnter={props.onMouseEnter}
              />
            </React.Fragment>
          )}
          {false && (
            <React.Fragment>
              <Subheader>Om {navn}</Subheader>
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

const Kodeliste = ({ title, apidata, metadata, onGoToCode, onMouseEnter }) => {
  if (!metadata) return null
  return (
    <React.Fragment>
      <Subheader>{title}</Subheader>
      {Object.keys(metadata).map(item => {
        const apibarn = apidata
          ? apidata[
              apidata
                .map(apiItem => {
                  return apiItem.kode
                })
                .indexOf(item)
            ] || {}
          : {}
        const metabarnet = metadata[item] || {}
        const kode = item.toString()
        return (
          <Kodelisteelement
            kode={kode}
            key={kode}
            {...apibarn}
            meta={metabarnet}
            onGoToCode={onGoToCode}
            onMouseEnter={onMouseEnter}
          />
        )
      })}
    </React.Fragment>
  )
}

export default KodeVindu
