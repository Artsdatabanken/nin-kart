import { Card, CardMedia } from "@material-ui/core";
import React from "react";
import config from "../../config";
import språk from "../../språk";
import Tittelblokk from "./Tittelblokk";
import tinycolor from "tinycolor2";
import Knapperad from "./Knapperad";

class Kodekort extends React.Component {
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
        filter: "drop-shadow(4px 4px 2px rgba(0, 0, 0, 0.2)",
        backgroundSize: "contain"
      };
    return {
      minHeight: 297,
      backgroundSize: "cover"
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
    const kontrastfarge =
      tc.getLuminance() > 0.6 ? "rgba(0,0,0,0.77)" : "rgba(255,255,255,0.77)";
    return (
      <Card square={false}>
        <CardMedia
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
          kontrastfarge={kontrastfarge}
          nivå={nivå}
          kode={kode}
          prefiks={prefiks}
          onNavigate={onNavigate}
          overordnet={overordnet}
        />
        {overordnet.length > 0 && (
          <Knapperad
            overordnet={overordnet}
            classes={classes}
            erAktivert={erAktivert}
            bbox={bbox}
            onFitBounds={onFitBounds}
            onToggleLayer={onToggleLayer}
          />
        )}
      </Card>
    );
  }
}

export default Kodekort;
