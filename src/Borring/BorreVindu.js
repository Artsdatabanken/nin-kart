import { withStyles } from "@material-ui/core/styles";
import {
  //FormControlLabel,
  //Switch,
  //Button,
  withTheme
} from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router";
import Borring from "./Borring";
import Sted from "./Sted";
import Kilde from "../Kilde";
import config from "../config";
import "./borre.css";

const styles = {};

class BorreVindu extends Component {
  state = { bareAktive: false };
  render() {
    const { barn, vis } = this.props;
    if (!barn) return null;
    const { AO, prefix, ...andreBarn } = barn;
    const dominant = this.finnButikkKode();

    let image_url = config.getFotoOmslag(dominant.url);
    return (
      <div className="sidebar_top_area sidebar_background_element">
        <div className="sidebar_element page_topic_header" />
        {/*
        <div
          className="sidebar_top_image"
          style={{
            backgroundImage: "url(" + image_url + ")"
          }}
          alt={dominant.tittel}
        />
        <span className="image_text_on_image">{dominant.tittel}</span>
        */}

        <div className="sidebar_title_container sidebar_element">
          {AO && (
            <Sted values={AO.values} sted={AO.sted} elevasjon={AO.elevasjon} />
          )}
        </div>
        {/*
        <div className="sidebar_element">
         
          {vis ? (
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={this.handleClickKunnskap}
            >
              Kunnskap
            </Button>
          ) : (
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={this.handleClickKilder}
            >
              Kilder
            </Button>
          )}


          <FormControlLabel
            className={classes.bareAktive}
            control={
              <Switch
                checked={this.state.bareAktive}
                onClick={() => {
                  this.setState({ bareAktive: !this.state.bareAktive });
                }}
              />
            }
            label="vis kun fra mine kartlag"
          />
        </div>
        */}
        <div>
          {vis ? (
            <Kilde geom_id={this.finnGeomId()} prefiks="NA" />
          ) : (
            <Borring barn={this.state.bareAktive ? {} : andreBarn} />
          )}
        </div>
      </div>
    );
  }

  finnKodeHack(barn, subkey, tittel, url) {
    barn = barn.values[subkey];
    if (!barn || !barn.values) return null;
    for (let key of Object.keys(barn.values)) {
      if (key === "NA-KLG") continue;
      if (key === "NA-BS") continue;
      if (key === "NA-LKM") continue;
      if (key.indexOf("-E-") > 0) return;
      url = url + "/" + config.hackUrl(barn.title);
      const kode = this.finnKodeHack(barn, key, barn.title, url);
      if (kode) return kode;
      return {
        kode: key,
        tittel: barn.title,
        url: tempHackUrl(url)
      };
    }
  }

  finnButikkKode() {
    const { barn } = this.props;
    const fallback = {
      url: "Natur_i_Norge/Natursystem",
      tittel: "Natursystem"
    };
    let r = this.finnKodeHack(
      { values: barn },
      "NA",
      "Natursystem",
      "Natur_i_Norge"
    );
    if (r) return r;
    r = this.finnKodeHack({ values: barn }, "LA", "Landskap", "Natur_i_Norge");
    if (r) return r;
    return fallback;
  }

  finnGeomHack(barn) {
    if (barn.id) return barn.id;
    if (!barn.values) return null;
    for (let key of Object.keys(barn.values)) {
      const node = barn.values[key];
      const id = this.finnGeomHack(node);
      if (id) return id;
    }
  }

  finnGeomId() {
    const { barn } = this.props;
    if (!barn) return;
    if (!barn.NA) return;
    return this.finnGeomHack(barn.NA);
  }

  handleClickKunnskap = () => {
    const { lat, lng, history } = this.props;
    history.push(`?lng=${lng}&lat=${lat}`);
  };

  handleClickKilder = () => {
    const { lat, lng, history } = this.props;
    history.push(`?lng=${lng}&lat=${lat}&vis=kilde`);
  };
}

function tempHackUrl(url) {
  url = url.replace(
    "Natur_i_Norge/Landskap",
    "Natur_i_Norge/Landskap/Typeinndeling"
  );
  url = url.replace(
    "Natur_i_Norge/Natursystem",
    "Natur_i_Norge/Natursystem/Typeinndeling"
  );
  return url;
}

export default withRouter(withTheme()(withStyles(styles)(BorreVindu)));
