import { List, ListItem } from '@material-ui/core'
import HardwareKeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import HardwareKeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import React from 'react'
import Collapsible from 'react-collapsible'
//import Detaljer from './Detaljer'
//import Kartlegging from './Kartlegging'
//import Omrader from './Omrader'
//import backend from '../backend'
//import FactList from './FactList'
import VectorPointInfo from './VectorPointInfo'

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
