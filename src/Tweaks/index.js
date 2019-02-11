import React from "react";
import { withRouter } from "react-router-dom";
import Bakgrunnskart from "./bakgrunn/Bakgrunnskart";
import Google from "./bakgrunn/Google";
import Polygon from "./Polygon";
import Terreng from "./Terreng";
import Gradient from "./Gradient";
import { List } from "@material-ui/core";

class Tweaks extends React.Component {
  state = {};
  seksjon(aktivtKartformat) {
    switch (aktivtKartformat) {
      case "osm_lys":
      case "osm_mørk":
        return <Bakgrunnskart {...this.props} />;
      case "google_satellite":
        return <Google {...this.props} />;
      case "terreng":
        return <Terreng {...this.props} />;
      case "gradient":
        return <Gradient {...this.props} />;
      case "polygon":
        return <Polygon {...this.props} />;
      default:
        console.error("Unknown " + aktivtKartformat);
    }
  }

  render() {
    console.log(this.props);
    const { style, aktivtKartformat } = this.props;
    return <List style={{ ...style }}>{this.seksjon(aktivtKartformat)}</List>;
  }
}

export default withRouter(Tweaks);
