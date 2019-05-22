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
  Panorama,
  Info,
  Pets,
  Landscape,
  BubbleChart,
  Layers,
  AssignmentInd
} from "@material-ui/icons";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NavigationChevronLeftDouble from "../Grunnkart/NavigationChevronLeftDouble";
import BildeAvatar from "../Kodetre/Kodeliste/Bildeavatar";
import Naturvern from "./Naturvern";
import GitHub from "./GitHub";
import Innstillinger from "./Innstillinger";

const styles = {
  link: { cursor: "pointer" },
  heading: { fontSize: 23, fontWeight: 500 }
};

class HamburgerMeny extends Component {
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
                  icon={<Landscape />}
                  primary="Landskap"
                />
                <Menyelement
                  onClick={this.handleClickFylke}
                  icon={<Layers />}
                  primary="Fylke"
                />
                <Menyelement
                  onClick={this.handleClickNaturvernområde}
                  icon={<Naturvern />}
                  primary="Naturvernområde"
                />
                {/* 
                <Menyelement
                  onClick={this.handleClickTruet_art_natur}
                  icon={<BubbleChart />}
                  primary="Truet art/natur"
                />
                */}
                <Menyelement
                  onClick={this.handleClickArt}
                  icon={<Pets />}
                  primary="Art"
                />
                <Divider />
                <Menyelement
                  icon={<Info />}
                  primary="Informasjon"
                  onClick={this.handleClickInfoTab}
                />
                <Divider />
                <ListSubheader>Datagrunnlag</ListSubheader>
                <Menyelement
                  icon={<CloudDownload />}
                  primary="Last ned data"
                  onClick={this.handleClickLastNed}
                />
                <Menyelement
                  onClick={this.handleClickLastOpp}
                  icon={<CloudUpload />}
                  primary="Levere data"
                />

                <Menyelement
                  onClick={this.handleClickDatakilde}
                  icon={<AssignmentInd />}
                  primary="Datakilder"
                />
                <Menyelement
                  onClick={this.handleClickSource}
                  icon={<GitHub />}
                  primary="Kildekode"
                />
                <Divider />
                <Innstillinger
                  visKoder={context.visKoder}
                  sorterPåKode={context.sorterPåKode}
                  onUpdateSetting={context.onUpdateValue}
                  onNavigate={this.handleNavigate}
                />
                <Divider />
                <ListSubheader>Kontakt</ListSubheader>
                <Menyelement
                  onClick={this.handleClickBidra}
                  icon={<Comment />}
                  primary="Tilbakemeldinger"
                />

                <Menyelement
                  onClick={this.handleClickLogo}
                  icon={<BildeAvatar url="Datakilde/Artsdatabanken" />}
                  primary="Artsdatabanken"
                />
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
      "https://github.com/Artsdatabanken/nin-kart-frontend/wiki/%C3%98nsker-du-%C3%A5-bidra-med-data%3F"
    );
  handleClickLogo = () => window.open("https://artsdatabanken.no");
  handleClickMap = () => this.props.history.push("/");
  handleClickNatursystem = () =>
    this.props.history.push("/Natur_i_Norge/Natursystem/");
  handleClickInfoTab = () => this.props.history.push("?info");
  handleClickLandskap = () =>
    this.props.history.push("/Natur_i_Norge/Landskap/");
  handleClickStat = () => this.props.history.push("/Natur_i_Norge/Stats/");

  handleClickFylke = () => this.props.history.push("/Fylke/");
  handleClickNaturvernområde = () =>
    this.props.history.push("/Naturvernområde/");
  handleClickTruet_art_natur = () =>
    this.props.history.push("/Truet_art_natur/");
  handleClickArt = () => this.props.history.push("/Biota/");
  handleClickDatakilde = () => this.props.history.push("/Datakilde/");
  handleClickNaturvernområde = () =>
    this.props.history.push("/Naturvernområde/");
  handleClickNaturvernområde = () =>
    this.props.history.push("/Naturvernområde/");

  handleNavigate = url => this.props.history.push(url);
}

export default withRouter(withStyles(styles)(HamburgerMeny));
