import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import Bildeavatar from "./Bildeavatar";

const styles = {
  text: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    fontSize: 13,
    width: 235
  },
  inset: { marginLeft: 56 },
  listitem: { height: 38, cursor: "pointer" },
  itemtext: { fontSize: 13, fontWeight: 100 },
  textmatch: { color: "black", fontWeight: 500 },
  textnomatch: { color: "#333", fontWeight: 400 }
};

class ResultatListe extends Component {
  filtrer(kode) {
    const prefix = kode.substring(0, 2);
    switch (prefix) {
      case "AR":
      case "AO":
      case "VV":
        return "";
      default:
        return kode.substring(3);
    }
  }

  render() {
    const { onClick, query, searchResults, classes } = this.props;
    if (!searchResults) return null;
    if (!searchResults.length > 0) return null;
    return (
      <Paper elevation={4} style={{ borderRadius: "0 0 4px 4px" }}>
        <List style={{ paddingTop: 0, paddingBottom: 0 }}>
          {searchResults.map(item => {
            const navn = item.title;
            return (
              <React.Fragment key={item.url}>
                <ListItem
                  divider={true}
                  button={true}
                  className={classes.listitem}
                  onMouseDown={() => {
                    onClick(item.url);
                  }}
                  key={item.url}
                >
                  <Bildeavatar size="small" kode={item.kode} url={item.url} />
                  <ListItemText classes={{ primary: classes.text }}>
                    {ResultatListe.highlightMatch(navn, query, classes)}
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <ListItemText>
                      <div className={classes.itemtext}>
                        {ResultatListe.highlightMatch(
                          this.filtrer(item.kode),
                          query,
                          classes
                        )}
                      </div>
                    </ListItemText>
                  </ListItemSecondaryAction>
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </Paper>
    );
  }

  // Highlight all matches
  static highlightMatch(text, higlight, classes) {
    // make array of terms, ordered by longest term
    let terms = (higlight || "")
      .toLowerCase()
      .split(" ")
      .sort(function(a, b) {
        return b.length - a.length;
      });
    // make regex OR filter by concatenating terms with |
    let filter = terms
      .toString()
      .toLowerCase()
      .replace(/[,\\]/g, "|");

    // Split on all terms and also include the terms into parts array, ignore case
    let parts = text.split(new RegExp(`(${filter})`, "gi"));
    console.log("parts", parts);
    return (
      <React.Fragment>
        {parts.map((part, i) => (
          <span
            key={i}
            className={
              terms.indexOf(part.toLowerCase()) >= 0
                ? classes.textmatch
                : classes.textnomatch
            }
          >
            {part}
          </span>
        ))}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ResultatListe);
