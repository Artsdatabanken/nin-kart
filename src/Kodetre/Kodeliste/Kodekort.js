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
import farger from "../../farger";
import språk from "../../språk";
import Tittelblokk from "./Tittelblokk";

const styles = {
  pos: {
    marginBottom: 12
  },
  iconSmall: {
    fontSize: 20,
    marginRight: 8
  },
  button: {
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
      prefiks,
      bbox,
      tittel,
      nivå,
      overordnet,
      classes,
      erAktivert,
      onNavigate
    } = this.props;
    return (
      <Card square={false} style={{ backgroundColor: "#ccc" }}>
        <CardMedia
          style={this.styles(url)}
          onClick={this.handleOpen}
          image={config.getFotoOmslag(url, 408)}
          alt={"foto av" + tittel}
        />
        <Tittelblokk
          tittel={språk(tittel)}
          nivå={nivå}
          kode={kode}
          prefiks={prefiks}
          onNavigate={onNavigate}
          overordnet={overordnet}
        >
          <CardActions>
            {overordnet.length > 0 && (
              <React.Fragment>
                <Button
                  xsize="small"
                  variant="contained"
                  className={classes.button}
                  onClick={this.handleAktiver}
                  disabled={erAktivert}
                >
                  <LibraryAdd className={classes.iconSmall} />
                  Aktivér
                </Button>
                <Button
                  style={{
                    color: farger.lys[prefiks]
                  }}
                  className={classes.button}
                  variant="text"
                  onClick={this.handleClickTweaks}
                >
                  <ColorLens className={classes.iconSmall} />
                  Vis
                </Button>
                {bbox && (
                  <Button
                    style={{
                      color: farger.lys[prefiks]
                    }}
                    className={classes.button}
                    variant="text"
                    onClick={this.handleFitBounds}
                  >
                    <ZoomOutMap className={classes.iconSmall} />
                    Zoom til
                  </Button>
                )}
              </React.Fragment>
            )}
          </CardActions>
        </Tittelblokk>
      </Card>
    );
  }

  handleClickAktiveLag = () => this.props.history.push("/");
  handleClickTweaks = () =>
    this.props.history.push(this.props.history.location.pathname + "?vis");
  handleFitBounds = () => this.props.onFitBounds(this.props.bbox);
}

export default withRouter(withStyles(styles)(Kodekort));
