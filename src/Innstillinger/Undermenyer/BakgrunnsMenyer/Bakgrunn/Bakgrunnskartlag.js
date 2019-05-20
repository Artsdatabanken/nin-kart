import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch
} from "@material-ui/core";
import { default as React } from "react";
import { withRouter } from "react-router";

import VelgFargeBoks from "Innstillinger/FerdigeMiniElement/VelgFargeBoks";

const Bakgrunnskartlag = ({
  onUpdateLayerProp,
  lagNavn,
  tittel,
  erSynlig,
  farge,
  history
}) => (
  <ListItem
    onClick={() =>
      history.push(history.location.pathname + "?vis_farge=" + lagNavn)
    }
    button={true}
  >
    <Switch
      onClick={e => e.stopPropagation()}
      onChange={() => onUpdateLayerProp("bakgrunnskart", lagNavn, !erSynlig)}
      checked={erSynlig}
    />

    <ListItemText primary={tittel} />
    <ListItemSecondaryAction
      onClick={() =>
        history.push(history.location.pathname + "?vis_farge=" + lagNavn)
      }
      style={{ cursor: "pointer", paddingRight: 12 }}
    >
      <VelgFargeBoks farge={farge} />
    </ListItemSecondaryAction>
  </ListItem>
);

export default withRouter(Bakgrunnskartlag);
