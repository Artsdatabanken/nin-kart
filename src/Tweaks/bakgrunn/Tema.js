import { List, ListItem, ListItemText } from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router";
import thumb_flyfoto from "./satellite.jpg";
import thumb_lys from "./thumb_lys.jpg";
import thumb_mørk from "./thumb_mørk.jpg";
import thumb_hybrid from "./hybrid.jpg";

const KartPreview = ({ thumb, tittel, valgt, onClick }) => (
  <ListItem button={true} onClick={onClick} selected={valgt}>
    <ListItemText
      primary={tittel}
      secondary={<img src={thumb} alt={tittel} />}
    />
  </ListItem>
);

class Tema extends Component {
  handleClick = tema => {
    this.props.onUpdateLayerProp("bakgrunnskart", "kart.aktivtFormat", tema);
    this.props.history.push(".");
  };
  render() {
    const { valgt } = this.props;
    return (
      <React.Fragment>
        <List>
          <KartPreview
            onClick={() => this.handleClick("osm_mørk")}
            thumb={thumb_mørk}
            valgt={valgt === "osm_mørk"}
            tittel="Mørk (OpenStreetMap)"
          />
          <KartPreview
            onClick={() => this.handleClick("osm_lys")}
            thumb={thumb_lys}
            valgt={valgt === "osm_lys"}
            tittel="Lys (OpenStreetMap)"
          />
          <KartPreview
            onClick={() => this.handleClick("google_satellite")}
            thumb={thumb_flyfoto}
            valgt={valgt === "google_satellite"}
            tittel="Flyfoto (Google)"
          />
          <KartPreview
            onClick={() => this.handleClick("google_hybrid")}
            thumb={thumb_hybrid}
            valgt={valgt === "google_hybrid"}
            tittel="Hybrid (Google)"
          />
        </List>
      </React.Fragment>
    );
  }
}

export default withRouter(Tema);
