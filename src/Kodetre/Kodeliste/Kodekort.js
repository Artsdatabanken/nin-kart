import { Card, CardMedia } from "@material-ui/core";
import React from "react";
import config from "../../config";
import språk from "../../språk";
import Tittelblokk from "./Tittelblokk";
import tinycolor from "tinycolor2";
import Knapperad from "./Knapperad";
import { kontrastfarge } from "../../farger";

class Kodekort extends React.Component {
  // This component is used in the top part of the sidebar,
  // contains image, header-row (Tittelblokk), and the zoom button navbar (Knapperad)
  state = {
    visBilde: false
  };

  handleClose = () => {
    this.setState({ visBilde: false });
  };
  handleOpen = () => {
    this.setState({ visBilde: true });
  };

  erTransparent(url) {
    if (url.startsWith("Fylke")) return true;
    if (url.startsWith("Datakilde/")) return true;
    return false;
  }

  styles(url) {
    if (this.erTransparent(url))
      return {
        minHeight: 297,
        marginTop: 142,
        marginBottom: 16,
        filter: "drop-shadow(rgba(0, 0, 0, 0.5) 5px 5px 4px)",
        backgroundSize: "contain"
      };
    return {
      minHeight: 297,
      _backgroundSize: "cover"
    };
  }

  render() {
    const {
      kode,
      url,
      farge,
      prefiks,
      bbox,
      tittel,
      nivå,
      overordnet,
      classes,
      erAktivert,
      onNavigate,
      onFitBounds,
      onToggleLayer
    } = this.props;
    const tc = new tinycolor(farge);
    return (
      <div
        square={false}
        className="sidebar_top_area sidebar_background_element"
      >
        <CardMedia
          className="Temporary_class_for_detection"
          style={this.styles(url)}
          onClick={this.handleOpen}
          image={config.getFotoOmslag(url, 408)}
          alt={"foto av" + tittel}
        />
        <Tittelblokk
          tittel={språk(tittel)}
          farge={tc.desaturate(30).toHexString()}
          chipFarge={tc
            //            .desaturate(10)
            .lighten(10)
            .toHexString()}
          kontrastfarge={kontrastfarge(farge)}
          nivå={nivå}
          kode={kode}
          prefiks={prefiks}
          onNavigate={onNavigate}
          overordnet={overordnet}
          className="Temporary_class_for_detection_2"
        />
        {overordnet.length > 0 && (
          <Knapperad
            overordnet={overordnet}
            classes={classes}
            erAktivert={erAktivert}
            bbox={bbox}
            onFitBounds={onFitBounds}
            onToggleLayer={onToggleLayer}
            className="Temporary_class_for_detection_3"
          />
        )}
      </div>
    );
  }
}

export default Kodekort;
