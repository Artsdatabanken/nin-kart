import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  withTheme,
} from '@material-ui/core'
import React from 'react'

const Veksle = ({ tittel, icon, toggled, disabled, onClick, muiTheme }) => (
  <ListItem>
    {icon && <ListItemAvatar>{icon}</ListItemAvatar>}
    <ListItemText primary={tittel} />
    <ListItemSecondaryAction>
      <Switch checked={toggled} disabled={disabled} onClick={onClick} />
    </ListItemSecondaryAction>
  </ListItem>
)

export default withTheme()(Veksle)
