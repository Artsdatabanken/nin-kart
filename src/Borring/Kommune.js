import { ListItem, ListItemText } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router'

const Kommune = props => {
  let primær = props.placename ? props.placename : props.kommune
  const sekundær = props.placename
    ? props.kommune + ', ' + props.fylkesnavn
    : props.fylkesnavn
  if (props.elevation) primær += formatElevation(props.elevation)
  return (
    <ListItem
      button={true}
      onClick={() => props.history.push(`/katalog/` + props.knr)}
    >
      <ListItemText primary={primær} secondary={sekundær} />
    </ListItem>
  )
}

function formatElevation(elevation) {
  if (elevation < 0) return ' (' + -elevation + ' muh)'
  return ' (' + elevation + ' moh)'
}

export default withRouter(Kommune)
