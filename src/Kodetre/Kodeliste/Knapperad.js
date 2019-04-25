import { Button, withStyles } from "@material-ui/core";
import { OpenInNew } from "@material-ui/icons/";
import { LibraryAdd, ZoomOutMap, ColorLens } from "@material-ui/icons/";
import React from "react";
import { withRouter } from "react-router";

const styles = {
  iconSmall: {
    fontSize: 20,
    marginRight: 8
  },
  button: {
    color: "rgba(0,0,0,0.6)",
    marginRight: 8
  },
  cardActions: {
    paddingLeft: 24
  }
};

const Knapperad = ({
  classes,
  erAktivert,
  bbox,
  history,
  onToggleLayer,
  onFitBounds
}) => (
  <>
    {bbox && (
      <div className="sidebar_element">
        <Button
          className={classes.button}
          onClick={onToggleLayer}
          disabled={erAktivert}
        >
          <LibraryAdd className={classes.iconSmall} />
          Aktivér
        </Button>
        <Button
          className={classes.button}
          onClick={() => history.push(history.location.pathname + "?vis")}
        >
          <ColorLens className={classes.iconSmall} />
          Vis
        </Button>

        <Button className="zoom_button" onClick={() => onFitBounds(bbox)}>
          <OpenInNew className="classes.iconSmall" />
          Zoom til
        </Button>
      </div>
    )}
  </>
);

export default withRouter(withStyles(styles)(Knapperad));
