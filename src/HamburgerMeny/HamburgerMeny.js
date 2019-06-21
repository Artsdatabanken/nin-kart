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
import {
  CloudUpload,
  CloudDownload,
  Comment,
  Info,
  AssignmentInd
} from "@material-ui/icons";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NavigationChevronLeftDouble from "../Grunnkart/NavigationChevronLeftDouble";
import BildeAvatar from "GjenbruksElement/Bildeavatar";
import GitHub from "./GitHub";
import Innstillinger from "./Innstillinger";
import Utforsk from "./Utforsk/Utforsk";

class HamburgerMeny extends Component {
  render() {
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
                <ListItemText primary="Natur i Norge" />
                <ListItemSecondaryAction>
                  <IconButton onClick={context.onToggleHovedmeny}>
                    <NavigationChevronLeftDouble />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />

              <div>
                <Divider />
                <ListSubheader>Hva vil du utforske?</ListSubheader>

                <Utforsk parent={this} props={this} context={context} />

                <Divider />
                <Menyelement
                  icon={<Info />}
                  primary="Informasjon"
                  onClick={() => {
                    this.handleClickInfoTab();
                    context.onToggleHovedmeny();
                  }}
                />
                <Divider />
                <ListSubheader>Datagrunnlag</ListSubheader>
                <Menyelement
                  icon={<CloudDownload />}
                  primary="Last ned data"
                  onClick={() => {
                    this.handleClickLastNed();
                    context.onToggleHovedmeny();
                  }}
                />
                <Menyelement
                  onClick={() => {
                    this.handleClickLastOpp();
                    context.onToggleHovedmeny();
                  }}
                  icon={<CloudUpload />}
                  primary="Levere data"
                />

                <Menyelement
                  onClick={() => {
                    this.handleClickDatakilde();
                    context.onToggleHovedmeny();
                  }}
                  icon={<AssignmentInd />}
                  primary="Datakilder"
                />
                <Menyelement
                  onClick={() => {
                    this.handleClickSource();
                    context.onToggleHovedmeny();
                  }}
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
                  onClick={() => {
                    this.handleClickBidra();
                    context.onToggleHovedmeny();
                  }}
                  icon={<Comment />}
                  primary="Tilbakemeldinger"
                />

                <Menyelement
                  onClick={() => {
                    this.handleClickLogo();
                    context.onToggleHovedmeny();
                  }}
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
  handleClickInfoTab = () => this.props.history.push("?info");
  handleClickLandskap = () =>
    this.props.history.push("/Natur_i_Norge/Landskap/");
  handleClickStat = () => this.props.history.push("/Natur_i_Norge/Stats/");
  handleClickTruet_art_natur = () =>
    this.props.history.push("/Truet_art_natur/");
  handleClickDatakilde = () => this.props.history.push("/Datakilde/");

  handleNavigate = url => this.props.history.push(url);
}

export default withRouter(HamburgerMeny);
