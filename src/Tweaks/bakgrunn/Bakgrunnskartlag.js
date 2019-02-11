import {
  Avatar,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch
} from "@material-ui/core";
import { default as React } from "react";
import { withRouter } from "react-router";

const Bakgrunnskartlag = ({
  onUpdateLayerProp,
  lagNavn,
  tittel,
  erSynlig,
  farge,
  history
}) => (
  <ListItem
    onClick={() => history.push("/visning/bakgrunnskart/" + lagNavn)}
    button={true}
  >
    <Switch
      onClick={e => e.stopPropagation()}
      onChange={() => onUpdateLayerProp("bakgrunnskart", lagNavn, !erSynlig)}
      checked={erSynlig}
    />
    <ListItemText primary={tittel} />
    <ListItemSecondaryAction
      onClick={() => history.push("/visning/bakgrunnskart/" + lagNavn)}
      style={{ cursor: "pointer", paddingRight: 12 }}
    >
      <Avatar style={{ backgroundColor: farge }} />
    </ListItemSecondaryAction>
  </ListItem>
);

export default withRouter(Bakgrunnskartlag);
