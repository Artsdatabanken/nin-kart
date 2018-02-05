import React from 'react'
import { List, ListItem } from 'material-ui'
import Detaljer from './Detaljer'
//import Kartlegging from './Kartlegging'
//import Omrader from './Omrader'
import backend from '../backend'
import FactList from './FactList'
import PointInfo from './PointInfo'
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import Collapsible from 'react-collapsible'

const Punktinformasjon = props => (
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
      {/* <PointInfo pointInfo={props.lngLat} /> */}
      <PointInfo pointInfo={props.stedsnavn} />
      <PointInfo pointInfo={props.admEnhet} />
      <PointInfo pointInfo={props.pointInfo} />
    </List>
  </Collapsible>
)

export default Punktinformasjon
