import typesystem from "@artsdatabanken/typesystem";
import { ListItem, ListItemText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";

const styles = {
  list: { paddingTop: 0 },
  li: {
    fontSize: 13,
    color: "rgba(0,0,0,0.87)",
    paddingLeft: 16
  },
  liroot: {
    backgroundColor: "red",
    paddingTop: 0,
    paddingBottom: 0
  },
  color: {
    color: "rgba(0,0,0,0.87)"
  }
};

const Ingress = ({ infoUrl, ingress, classes }) => {
  return (
    <ListItem className={classes.list}>
      <ListItemText
        classes={{
          primary: classes.li
        }}
      >
        {ingress}
        {infoUrl && (
          <span>
            &nbsp;
            <a
              target="top"
              rel="noopener"
              className={classes.color}
              href={infoUrl}
            >
              {typesystem.capitalizeTittel(
                new URL(infoUrl).host.split(".").splice(-2, 1)[0]
              )}
            </a>
          </span>
        )}
      </ListItemText>
    </ListItem>
  );
};

export default withStyles(styles)(Ingress);
