import {
  Avatar,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  ListItemAvatar,
} from '@material-ui/core'
import { default as React } from 'react'
import { withRouter } from 'react-router'

const Bakgrunnskartlag = ({
  onUpdateLayerProp,
  lagNavn,
  tittel,
  erSynlig,
  farge,
  history,
}) => (
  <ListItem
    onClick={() => history.push('/lag/bakgrunnskart/' + lagNavn)}
    button={true}
  >
    <ListItemAvatar>
      <Switch
        onClick={e => e.stopPropagation()}
        onChange={() => onUpdateLayerProp('bakgrunnskart', lagNavn, !erSynlig)}
        checked={erSynlig}
      />
    </ListItemAvatar>
    <ListItemText primary={tittel} />
    <ListItemSecondaryAction
      onClick={() => history.push('/lag/bakgrunnskart/' + lagNavn)}
      style={{ cursor: 'pointer', paddingRight: 12 }}
    >
      <Avatar style={{ backgroundColor: farge }} />
    </ListItemSecondaryAction>
  </ListItem>
)

export default withRouter(Bakgrunnskartlag)
