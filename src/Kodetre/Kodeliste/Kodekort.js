import { Card, CardMedia } from "@material-ui/core";
import React from "react";
import config from "../../config";
import språk from "../../språk";
import Tittelblokk from "./Tittelblokk";
import tinycolor from "tinycolor2";
import Knapperad from "./Knapperad";
import { kontrastfarge } from "../../farger";

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
    console.log(url);
    if (url.startsWith("Fylke")) return true;
    if (url.startsWith("Naturvernområde")) return true;
    if (url.startsWith("Datakilde/")) return true;
    return false;
  }

  styles(url) {
    if (this.erTransparent(url))
      return {
        _minHeight: 297,
        _marginTop: 142,
        _marginBottom: 16,
        filter: "drop-shadow(rgba(0, 0, 0, 0.5) 5px 5px 4px)",
        _backgroundSize: "contain"
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
      <Card square={false}>
        <img
          style={this.styles(url)}
          onClick={this.handleOpen}
          image2={config.getFotoOmslag(url, 408)}
          src="https://data.artsdatabanken.no/Naturvernomr%C3%A5de/%C3%98rland/omr%C3%A5de.png"
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
