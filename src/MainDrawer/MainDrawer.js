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
import { CloudUpload, CloudDownload, Comment } from "@material-ui/icons";
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
                  url="Natur_i_Norge/Datakilde/Artsdatabanken"
                  kode="OR-AD"
                  size="small"
                />
              </div>
              <ListItemText primary="Artsdatabanken" />
            </ListItem>
          </div>
        </List>
      </SwipeableDrawer>
    );
  }
  handleClickBidra = () =>
    window.open("https://github.com/Artsdatabanken/ratatouille/issues");
  handleClickSource = () =>
    window.open("https://github.com/Artsdatabanken/ratatouille/");
  handleClickLastNed = () =>
    window.open(
      "https://github.com/Artsdatabanken/ratatouille/blob/master/docs/LastNed.md"
    );
  handleClickLastOpp = () =>
    window.open(
      "https://github.com/Artsdatabanken/ratatouille/blob/master/docs/BidraMedData.md"
    );
  handleClickLogo = () => window.open("https://artsdatabanken.no");
  handleClickMap = () => this.props.history.push("/");
}

MainDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(MainDrawer));
