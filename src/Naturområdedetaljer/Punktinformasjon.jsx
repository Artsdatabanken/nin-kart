import React from 'react'
import { List } from 'material-ui'
import Detaljer from './Detaljer'
//import Kartlegging from './Kartlegging'
//import Omrader from './Omrader'
import backend from '../backend'
import FactList from './FactList'
import PointInfo from './PointInfo'

const Punktinformasjon = props => (
  <List>
    {/* <Omrader areas={props.admEnhetInfo} /> */}
    {/*<Naturniva level={backend.NatureLevelNames[props.natureArea.nivå]}/>*/}
    <PointInfo pointInfo={props.lngLat} />
    <PointInfo pointInfo={props.stedsnavn} />
    <PointInfo pointInfo={props.admEnhet} />
    <PointInfo pointInfo={props.pointInfo} />

    <FactList items={getNatureAreaFacts(props)} />

    {props.natureArea.parameters && (
      <FactList
        items={props.natureArea.parameters.map(item => ({
          id: item.code,
          primary: item.code,
          secondary: item.codeDescription,
        }))}
      />
    )}

    {props.natureArea.description && (
      <Detaljer description={props.natureArea.description} />
    )}
    {/* <Kartlegging owner={props.metadata.owner} /> */}
  </List>
)

function getNatureAreaFacts(props) {
  var facts = []
  for (var i in props.natureArea) {
    switch (i) {
      case 'nivå':
        facts.push({
          id: 1,
          primary: 'Naturnivå',
          secondary: backend.NatureLevelNames[props.natureArea.nivå],
        })
        break
      case 'surveyScale':
        facts.push({
          id: 2,
          primary: 'Kartleggingsmålestokk',
          secondary: props.metadata.surveyScale,
        })
        break
      case 'surveyedFrom':
        facts.push({
          id: 3,
          primary: 'Kartlagt',
          secondary: props.metadata.surveyedFrom,
        })
        break
      case 'rødlisteKategori':
        facts.push({
          id: 4,
          primary: 'Rødlistekategori',
          secondary: props.natureArea.rødlisteKategori.code,
        })
        if (props.natureArea.rødlisteKategori.vurderingsenhet) {
          facts.push({
            id: 5,
            primary: 'Vurderingsenhet',
            secondary: props.natureArea.rødlisteKategori.vurderingsenhet.code,
          })
        }
        break
      default:
        break
    }
  }
  return facts
}

export default Punktinformasjon
