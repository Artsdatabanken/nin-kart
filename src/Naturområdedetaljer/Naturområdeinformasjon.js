import React from 'react'
import { List, ListItem } from 'material-ui'
import Detaljer from './Detaljer'
//import Kartlegging from './Kartlegging'
//import Omrader from './Omrader'
import backend from '../backend'
import FactList from './FactList'
//import PointInfo from './PointInfo'
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import Collapsible from 'react-collapsible'

const Naturområdeinformasjon = props => (
  <div>
    {props.natureArea && (
      <Collapsible
        trigger={
          <ListItem
            primaryText={props.title}
            rightIcon={<HardwareKeyboardArrowDown />}
          />
        }
        triggerWhenOpen={
          <ListItem
            primaryText={props.title}
            rightIcon={<HardwareKeyboardArrowUp />}
          />
        }
        easing="ease-in-out"
      >
        <List>
          <FactList items={getNatureAreaFacts(props)} />

          <FactList items={getNatureAreaCodes(props)} />

          <Detaljer description={getNatureAreaDescription(props)} />

          {/* <Kartlegging owner={props.metadata.owner} /> */}
        </List>
      </Collapsible>
    )}
  </div>
)

function getNatureAreaDescription(props) {
  if (props.natureArea && props.natureArea.description)
    return props.natureArea.description
}

function getNatureAreaCodes(props) {
  var codes = []
  if (!props.natureArea) return null
  for (var i in props.natureArea.parameters) {
    codes.push({
      id: props.natureArea.parameters[i].code,
      primary: props.natureArea.parameters[i].code,
      secondary: props.natureArea.parameters[i].codeDescription,
    })
  }
  return codes
}

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

export default Naturområdeinformasjon
