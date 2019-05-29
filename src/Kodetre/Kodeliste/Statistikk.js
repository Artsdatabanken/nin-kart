import { ListItem, ListItemText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import prettyprint from "Funksjoner/prettyprint";

const styles = {
  list: { paddingTop: 0 },
  li: {
    fontSize: 13,
    color: "rgba(0,0,0,0.87)",
    paddingLeft: 16
  },
  liroot: {
    paddingTop: 0,
    paddingBottom: 0
  },
  color: {
    color: "rgba(0,0,0,0.87)"
  }
};

const Statistikk = ({
  prefiks,
  overordnet,
  stats,
  tittel,
  prefix,
  arealPrefix,
  toppnavn,
  classes,
  ...props
}) => {
  if (!stats.areal) return null;
  const arter = stats.arter + " ulike arter";
  const areal = stats.areal;
  const prosent = ((100 * stats.areal) / arealPrefix).toFixed(1) + " %";
  return (
    <ListItem className={classes.liroot}>
      <ListItemText
        classes={{
          primary: classes.li,
          root: classes.liroot
        }}
      >
        {tekst({
          tittel: tittel,
          overordnet: overordnet,
          prefiks: prefiks,
          areal,
          arter,
          prosent
        })}
      </ListItemText>
    </ListItem>
  );
};

function tekst(props) {
  const { prefiks, overordnet, areal, arter, tittel } = props;
  switch (prefiks) {
    case "NA":
    case "LA":
      const topp = overordnet[overordnet.length - 3];
      const utgjør = topp
        ? `Dette utgjør ${prosent(
            areal,
            topp.areal
          )} av kartlagte ${topp.tittel.nb.toLowerCase()}.`
        : "";
      return `Det er kartlagt ${prettyprint.prettyPrintAreal(
        areal
      )} ${tittel.toLowerCase()}. ${utgjør} Det er observert ${arter} i områder som er kartlagt som ${tittel.toLowerCase()}.`;
    case "VV":
      const mor = overordnet[0];
      const morareal = mor.areal;
      return `${tittel} er ${prettyprint.prettyPrintAreal(areal)}. ${
        morareal
          ? `Dette utgjør ${prosent(
              areal,
              morareal
            )} av vernet areal i Norge inkludert Svalbard og Jan Mayen.`
          : ""
      } Det er observert ${arter} i ${tittel}.`;
    default:
      return null;
  }
}

const prosent = (over, under) => ((100 * over) / under).toFixed(1) + " %";

export default withStyles(styles)(Statistikk);
