import React from 'react'
import { Paper } from 'material-ui'
import Detaljer from './Detaljer'
import Kartlegging from './Kartlegging'
import Omrader from './Omrader'
import backend from '../backend'
import FactList from './FactList'

const NatureAreaDetails = props => (
  <Paper>
    <Omrader areas={props.natureArea.areas} />
    {/*<Naturniva level={backend.NatureLevelNames[props.natureArea.nivå]}/>*/}
    <FactList
      items={[
        {
          id: 1,
          secondary: 'Naturnivå',
          primary: backend.NatureLevelNames[props.natureArea.nivå],
        },
        {
          id: 2,
          secondary: 'Kartleggingsmålestokk',
          primary: props.metadata.surveyScale,
        },
        { id: 3, secondary: 'Kartlagt', primary: props.metadata.surveyedFrom },
        {
          id: 4,
          secondary: 'Rødlistekategori',
          primary: props.natureArea.rødlisteKategori
            ? props.natureArea.rødlisteKategori.code
            : '',
        },
        {
          id: 5,
          secondary: 'Vurderingsenhet',
          primary:
            props.natureArea.rødlisteKategori &&
            props.natureArea.rødlisteKategori.vurderingsenhet
              ? props.natureArea.rødlisteKategori.vurderingsenhet.code
              : '',
        },
        // {id:6, secondary: 'Naturtype', primary: props.natureArea.parameters ? props.natureArea.rødlisteKategori.vurderingsenhet : ""}
      ]}
    />

    <FactList
      items={
        props.natureArea.parameters
          ? props.natureArea.parameters.map(item => ({
              id: item.code,
              primary: item.code,
              secondary: item.codeDescription,
            }))
          : []
      }
    />

    <Detaljer description={props.natureArea.description} />
    <Kartlegging owner={props.metadata.owner} />
  </Paper>
)

export default NatureAreaDetails
