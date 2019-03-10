import {
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
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
  inset: { marginLeft: 48 },
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
      <List style={{ paddingTop: 0, paddingBottom: 0 }}>
        {searchResults.map(item => {
          const navn = item.title;
          return (
            <React.Fragment key={item.url}>
              <ListItem
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
              <Divider className={classes.inset} />
            </React.Fragment>
          );
        })}
      </List>
    );
  }

  static highlightMatch(text, query, classes) {
    if (!query) return text;
    const q = query.toLowerCase().split(" ")[0];
    const offset = text.toLowerCase().indexOf(q);
    if (offset < 0) return text;

    const end = offset + q.length;
    return (
      <span className={classes.textnomatch}>
        {text.substring(0, offset)}
        <span className={classes.textmatch}>{text.substring(offset, end)}</span>
        {text.substring(end, text.length)}
      </span>
    );
  }
}

export default withStyles(styles)(ResultatListe);
