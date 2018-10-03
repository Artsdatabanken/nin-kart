import { withTheme } from '@material-ui/core/styles'
import React from 'react'
import Label from './Label'
import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'

const Innstilling = ({
  tittel,
  undertittel,
  verdi,
  icon,
  disabled,
  children,
  theme,
}) => (
  <ListItem disabled={disabled}>
    {verdi && (
      <div
        style={{
          fontFamily: theme.typography.fontFamily,
          position: 'absolute',
          right: 20,
          top: 10,
          color: theme.palette.text.disabled,
        }}
      >
        {verdi}
      </div>
    )}
    {icon && <ListItemAvatar>{icon}</ListItemAvatar>}
    <ListItemText primary={tittel} secondary={undertittel} />
    {children}
  </ListItem>
)

export default withTheme()(Innstilling)
