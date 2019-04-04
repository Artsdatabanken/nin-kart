import { SettingsContext } from "./SettingsContext";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  SwipeableDrawer,
  ListItemSecondaryAction
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  CloudUpload,
  CloudDownload,
  Comment,
  Waves,
  Panorama
} from "@material-ui/icons";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NavigationChevronLeftDouble from "../Grunnkart/NavigationChevronLeftDouble";
import BildeAvatar from "../Kodetre/Kodeliste/Bildeavatar";
import GitHub from "./GitHub";
import Innstillinger from "./Innstillinger";

const styles = {
  link: { cursor: "pointer" },
  heading: { fontSize: 23, fontWeight: 500 }
};

class MainDrawer extends Component {
  render() {
    const {
      classes,
      erÅpen,
      toggleDrawer,
      visKoder,
      sorterPåKode,
      onUpdateSetting
    } = this.props;
    return (
      <SettingsContext.Consumer>
        {context => (
          <SwipeableDrawer
            anchor="left"
            open={erÅpen}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
          >
            <List>
              <ListItem>
                <ListItemText
                  classes={{ primary: classes.heading }}
                  primary="Natur i Norge"
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={toggleDrawer}>
                    <NavigationChevronLeftDouble />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <div
                tabIndex={0}
                role="button"
                onClick={toggleDrawer}
                onKeyDown={toggleDrawer}
              >
                <Divider />
                <ListSubheader>Hva vil du utforske?</ListSubheader>
                <ListItem onClick={this.handleClickNatursystem} button>
                  <ListItemIcon>
                    <Panorama />
                  </ListItemIcon>
                  <ListItemText primary="Natursystem" />
                </ListItem>
                <ListItem onClick={this.handleClickLandskap} button>
                  <ListItemIcon>
                    <Waves />
                  </ListItemIcon>
                  <ListItemText primary="Landskap" />
                </ListItem>
                <Divider />
                <ListItem onClick={this.handleClickLastNed} button>
                  <ListItemIcon>
                    <CloudDownload />
                  </ListItemIcon>
                  <ListItemText primary="Laste ned data" />
                </ListItem>
                <Divider />
                <Innstillinger
                  visKoder={visKoder}
                  sorterPåKode={sorterPåKode}
                  onUpdateSetting={onUpdateSetting}
                />
                <Divider />
                <ListSubheader>Bidra</ListSubheader>
                <ListItem onClick={this.handleClickBidra} button>
                  <ListItemIcon>
                    <Comment />
                  </ListItemIcon>
                  <ListItemText primary="Tilbakemeldinger" />
                </ListItem>
                <ListItem onClick={this.handleClickSource} button>
                  <ListItemIcon>
                    <GitHub />
                  </ListItemIcon>
                  <ListItemText primary="Kildekode" />
                </ListItem>
                <ListItem onClick={this.handleClickLastOpp} button>
                  <ListItemIcon>
                    <CloudUpload />
                  </ListItemIcon>
                  <ListItemText primary="Levere data" />
                </ListItem>
                <Divider />
                <ListSubheader>Driftes av</ListSubheader>
                <ListItem onClick={this.handleClickLogo} button>
                  <div className={classes.link}>
                    <BildeAvatar
                      url="Datakilde/Artsdatabanken"
                      kode="OR-AD"
                      size="small"
                    />
                  </div>
                  <ListItemText primary="Artsdatabanken" />
                </ListItem>
              </div>
            </List>
          </SwipeableDrawer>
        )}
      </SettingsContext.Consumer>
    );
  }
  handleClickBidra = () =>
    window.open("https://github.com/Artsdatabanken/nin-innsyn/issues");
  handleClickSource = () =>
    window.open("https://github.com/Artsdatabanken/nin-innsyn/");
  handleClickLastNed = () => window.open("https://data.artsdatabanken.no/");
  handleClickLastOpp = () =>
    window.open(
      "https://github.com/Artsdatabanken/nin-innsyn/blob/master/docs/BidraMedData.md"
    );
  handleClickLogo = () => window.open("https://artsdatabanken.no");
  handleClickMap = () => this.props.history.push("/");
  handleClickNatursystem = () =>
    this.props.history.push("/Natur_i_Norge/Natursystem/");
  handleClickLandskap = () =>
    this.props.history.push("/Natur_i_Norge/Landskap/");
  handleClickStat = () => this.props.history.push("/Natur_i_Norge/Stats/");
}

MainDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(MainDrawer));
