import React from 'react'
import { List, ListItem } from 'material-ui'
//import Detaljer from './Detaljer'
//import Kartlegging from './Kartlegging'
//import Omrader from './Omrader'
//import backend from '../backend'
//import FactList from './FactList'
import VectorPointInfo from './VectorPointInfo'
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import Collapsible from 'react-collapsible'

function getHeaderStyle() {
  return {
    backgroundColor: 'aliceblue',
  }
}

const VektorPunktinformasjon = props => (
  <Collapsible
    open={true}
    trigger={
      <ListItem
        primaryText={props.title}
        rightIcon={<HardwareKeyboardArrowDown />}
        style={getHeaderStyle()}
      />
    }
    triggerWhenOpen={
      <ListItem
        primaryText={props.title}
        rightIcon={<HardwareKeyboardArrowUp />}
        style={getHeaderStyle()}
      />
    }
    easing="ease-in-out"
  >
    <List>
      <VectorPointInfo pointInfo={props.natureAreaFacts} />
    </List>
  </Collapsible>
)

export default VektorPunktinformasjon
