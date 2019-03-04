import typesystem from "@artsdatabanken/typesystem";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import prettyprint from "../../prettyprint";

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

const Statistikk = ({
  tittel,
  toppnavn,
  ingress,
  stats,
  infoUrl,
  arealVindu,
  arterVindu,
  geometrierVindu,
  classes
}) => (
  <List>
    <Ingress infoUrl={infoUrl} ingress={ingress} classes={classes} />
    <Stats
      stats={stats}
      toppnavn={toppnavn}
      tittel={tittel}
      classes={classes}
    />
  </List>
);

const Ingress = ({ infoUrl, ingress, classes }) => {
  if (!ingress) return null;
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

const Stats = ({ stats, tittel, toppnavn, classes }) => {
  if (!stats) return null;
  const { areal, arealPrefix, arter } = stats;
  if (!areal) return null;
  return (
    <ListItem className={classes.liroot}>
      <ListItemText
        _classes={{
          primary: classes.li,
          root: classes.liroot
        }}
      >
        Det er kartlagt <b>{prettyprint.prettyPrintAreal(areal)}</b>
        &nbsp;
        {tittel.toLowerCase()}
        .&nbsp;
        {toppnavn && (
          <span>
            Dette utgjør&nbsp;
            <b>{((100 * areal) / arealPrefix).toFixed(1)} %</b> av
            kartlagte&nbsp;
            {toppnavn.toLowerCase()}.
          </span>
        )}
        {arter && (
          <span>
            &nbsp;Det er observert <b>{arter}</b> ulike arter i områder som er
            kartlagt som {tittel.toLowerCase()}.
          </span>
        )}
      </ListItemText>
    </ListItem>
  );
};

export default withStyles(styles)(Statistikk);
