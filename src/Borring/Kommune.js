import React from 'react'
import { withRouter } from 'react-router'
import Listeelement from './Listeelement'

const Kommune = props => {
  let primær = props.placename ? props.placename : props.kommune
  const sekundær = props.placename
    ? props.kommune + ', ' + props.fylkesnavn
    : props.fylkesnavn
  if (props.elevation) primær += formatElevation(props.elevation)
  return (
    <Listeelement
      kode="AO"
      kode2={props.knr}
      primary={primær}
      secondary={sekundær}
    />
  )
}

function formatElevation(elevation) {
  if (elevation < 0) return ' (' + -elevation + ' muh)'
  return ' (' + elevation + ' moh)'
}

export default withRouter(Kommune)
