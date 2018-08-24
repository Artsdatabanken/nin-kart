import {
  Avatar,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from '@material-ui/core'
import { default as React } from 'react'
import { withRouter } from 'react-router'
import PaintSwatch from '../../Kodetre/Kodeliste/PaintSwatch'

const Bakgrunnskartlag = ({
  onUpdateLayerProp,
  lagNavn,
  tittel,
  erSynlig,
  farge,
  history,
}) => (
  <ListItem
    button={true}
    onClick={() => history.push('/lag/bakgrunnskart/' + lagNavn)}
  >
    <Switch
      onChange={() => onUpdateLayerProp('bakgrunnskart', lagNavn, !erSynlig)}
      checked={erSynlig}
    />
    <ListItemText primary={tittel} />
    <ListItemSecondaryAction>
      <Avatar button={true}>
        <PaintSwatch color={farge} />
      </Avatar>
    </ListItemSecondaryAction>
  </ListItem>
)

export default withRouter(Bakgrunnskartlag)
