import { List, ListItem } from '@material-ui/core'
import HardwareKeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import HardwareKeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import React from 'react'
import PointInfo from './PointInfo'

function getHeaderStyle() {
  return {
    backgroundColor: 'aliceblue',
  }
}

const Collapsible = () => <div />

const Punktinformasjon = props => (
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
      {/* <PointInfo pointInfo={props.lngLat} /> */}
      <PointInfo pointInfo={props.stedsnavn} />
      <PointInfo pointInfo={props.admEnhet} />
      <PointInfo pointInfo={props.verneomrade} />
      <PointInfo pointInfo={props.pointInfo} />

      <PointInfo pointInfo={props.natureAreaFacts} excludeCode="true" />
    </List>
  </Collapsible>
)

export default Punktinformasjon
