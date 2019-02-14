import React from "react";
import { withRouter } from "react-router-dom";
import Bakgrunnskart from "./bakgrunn/Bakgrunnskart";
import Google from "./bakgrunn/Google";
import Polygon from "./Polygon";
import Terreng from "./Terreng";
import Gradient from "./Gradient";
import Indexed from "./Indexed";
import Generelt from "./Generelt";

class Tweaks extends React.Component {
  state = {};
  seksjon(aktivtKartformat) {
    switch (aktivtKartformat) {
      case "osm_lys":
      case "osm_mørk":
        return <Bakgrunnskart {...this.props} />;
      case "google_hybrid":
      case "google_satellite":
        return <Google {...this.props} />;
      case "normals":
        return <Terreng {...this.props} />;
      case "raster_gradient":
        return <Gradient {...this.props} />;
      case "raster_indexed":
        return <Indexed {...this.props} />;
      case "polygon":
        return <Polygon {...this.props} />;
      default:
        console.error("Unknown " + aktivtKartformat);
    }
  }

  render() {
    const { aktivtKartformat, history } = this.props;
    if (!aktivtKartformat) return null;
    return (
      <Generelt search={history.location.search} {...this.props}>
        {this.seksjon(aktivtKartformat)}
      </Generelt>
    );
  }
}

export default withRouter(Tweaks);
