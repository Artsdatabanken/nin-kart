import Menyelement from "./Menyelement";
import { SettingsContext } from "../SettingsContext";
import {
  Divider,
  IconButton,
  List,
  ListItem,
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
  Panorama,
  Info
} from "@material-ui/icons";
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
    const { classes } = this.props;
    return (
      <SettingsContext.Consumer>
        {context => (
          <SwipeableDrawer
            anchor="left"
            onClose={context.onToggleHovedmeny}
            onOpen={context.onToggleHovedmeny}
            open={context.visHovedmeny}
          >
            <List>
              <ListItem>
                <ListItemText
                  classes={{ primary: classes.heading }}
                  primary="Natur i Norge"
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={context.onToggleHovedmeny}>
                    <NavigationChevronLeftDouble />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <div
                tabIndex={0}
                role="button"
                onClick={context.onToggleHovedmeny}
                onKeyDown={context.onToggleHovedmeny}
              >
                <Divider />
                <ListSubheader>Hva vil du utforske?</ListSubheader>
                <Menyelement
                  onClick={this.handleClickNatursystem}
                  icon={<Panorama />}
                  primary="Natursystem"
                />
                <Menyelement
                  onClick={this.handleClickLandskap}
                  icon={<Waves />}
                  primary="Landskap"
                />
                <Menyelement
                  icon={<Info />}
                  primary="Informasjon"
                  onClick={this.handleClickInfoTab}
                />
                <Divider />
                <Menyelement
                  icon={<CloudDownload />}
                  primary="Last ned data"
                  onClick={this.handleClickLastNed}
                />
                <Divider />
                <Innstillinger
                  visKoder={context.visKoder}
                  sorterPåKode={context.sorterPåKode}
                  onUpdateSetting={context.onUpdateValue}
                  onNavigate={this.handleNavigate}
                />
                <Divider />
                <ListSubheader>Bidra</ListSubheader>
                <Menyelement
                  onClick={this.handleClickBidra}
                  icon={<Comment />}
                  primary="Tilbakemeldinger"
                />
                <Menyelement
                  onClick={this.handleClickSource}
                  icon={<GitHub />}
                  primary="Kildekode"
                />
                <Menyelement
                  onClick={this.handleClickLastOpp}
                  icon={<CloudUpload />}
                  primary="Levere data"
                />
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
    window.open("https://github.com/Artsdatabanken/nin-kart-frontend/issues");
  handleClickSource = () =>
    window.open("https://github.com/Artsdatabanken/nin-kart-frontend");
  handleClickLastNed = () => window.open("https://data.artsdatabanken.no/");
  handleClickLastOpp = () =>
    window.open(
      "https://github.com/Artsdatabanken/nin-kart-frontend/blob/master/docs/BidraMedData.md"
    );
  handleClickLogo = () => window.open("https://artsdatabanken.no");
  handleClickMap = () => this.props.history.push("/");
  handleClickNatursystem = () =>
    this.props.history.push("/Natur_i_Norge/Natursystem/");
  handleClickInfoTab = () => this.props.history.push("?info");
  handleClickLandskap = () =>
    this.props.history.push("/Natur_i_Norge/Landskap/");
  handleClickStat = () => this.props.history.push("/Natur_i_Norge/Stats/");
  handleNavigate = url => this.props.history.push(url);
}

export default withRouter(withStyles(styles)(MainDrawer));
