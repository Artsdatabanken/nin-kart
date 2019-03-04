import {
  Button,
  Card,
  CardActions,
  CardMedia,
  withStyles
} from "@material-ui/core";
import { LibraryAdd, ZoomOutMap, ColorLens } from "@material-ui/icons/";
import React from "react";
import { withRouter } from "react-router";
import config from "../../config";
import språk from "../../språk";
import Tittelblokk from "./Tittelblokk";
import tinycolor from "tinycolor2";

const styles = {
  iconSmall: {
    fontSize: 20,
    marginRight: 8
  },
  button: {
    color: "rgba(0,0,0,0.77)",
    marginRight: 8
  }
};

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
  handleAktiver = () => {
    this.props.onToggleLayer(this.props.kode, true);
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
      onNavigate
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
        <CardActions style={{ paddingLeft: 24 }}>
          {overordnet.length > 0 && (
            <React.Fragment>
              <Button
                className={classes.button}
                onClick={this.handleAktiver}
                disabled={erAktivert}
              >
                <LibraryAdd className={classes.iconSmall} />
                Aktivér
              </Button>
              <Button
                className={classes.button}
                onClick={this.handleClickTweaks}
              >
                <ColorLens className={classes.iconSmall} />
                Vis
              </Button>
              {bbox && (
                <Button
                  className={classes.button}
                  onClick={this.props.onFitBounds}
                >
                  <ZoomOutMap className={classes.iconSmall} />
                  Zoom til
                </Button>
              )}
            </React.Fragment>
          )}
        </CardActions>
      </Card>
    );
  }

  handleClickAktiveLag = () => this.props.history.push("/");
  handleClickTweaks = () =>
    this.props.history.push(this.props.history.location.pathname + "?vis");
}

export default withRouter(withStyles(styles)(Kodekort));
