import { Divider, ListItem, ListItemText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import Bildeavatar from "GjenbruksElement/Bildeavatar";

const styles = {};

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
    const { onSelect, query, searchResults, classes } = this.props;
    if (!searchResults) return null;
    if (searchResults.length <= 0) return null;
    return (
      <div
        //className="resultatliste" className={abc("resultatliste", isSearching)}
        //className="resultatliste"
        className="resultatliste mobile_active"
      >
        {searchResults.map(item => {
          const navn = item.title;
          return (
            <React.Fragment key={item.url}>
              <ListItem
                button={true}
                className={classes.listitem}
                onMouseDown={() => onSelect(item)}
                onKeyDown={e => {
                  if (e.keyCode === 13) {
                    onSelect(item);
                  }
                }}
                key={item.url}
              >
                <Bildeavatar url={item.url} />
                <ListItemText classes={{ primary: classes.text }}>
                  {ResultatListe.highlightMatch(navn, query, classes)}
                </ListItemText>

                <div className="itemtext">
                  {ResultatListe.highlightMatch(
                    this.filtrer(item.kode),
                    query,
                    classes
                  )}
                </div>
              </ListItem>
              <Divider className="inset" />
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  static highlightMatch(text, query, classes) {
    if (!query) return text;
    const q = query.toLowerCase().split(" ")[0];
    const offset = text.toLowerCase().indexOf(q);
    if (offset < 0) return text;

    const end = offset + q.length;
    return (
      <span>
        {text.substring(0, offset)}
        <span className="textmatch">{text.substring(offset, end)}</span>
        {text.substring(end, text.length)}
      </span>
    );
  }
}

export default withStyles(styles)(ResultatListe);
