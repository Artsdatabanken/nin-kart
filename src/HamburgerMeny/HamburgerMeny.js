import Menyelement from "./Menyelement";
import { SettingsContext } from "SettingsContext";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  ListItemSecondaryAction
} from "@material-ui/core";
import {
  OpenInNew,
  KeyboardArrowRight,
  CloudUpload,
  CloudDownload,
  Comment,
  HelpOutline,
  AssignmentInd
} from "@material-ui/icons";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NavigationChevronLeftDouble from "AppSettings/NavigationChevronLeftDouble";
import BildeAvatar from "GjenbruksElement/Bildeavatar";
import GitHub from "./GitHub";
import Innstillinger from "./Innstillinger";
import Utforsk from "./Utforsk/Utforsk";

class HamburgerMeny extends Component {
  render() {
    let spraak = this.props.spraak;
    const handleSpraak = this.props.handleSpraak;
    return (
      <SettingsContext.Consumer>
        {context => (
          <SwipeableDrawer
            className="hamburger_sidebar"
            anchor="left"
            onClose={context.onToggleHovedmeny}
            onOpen={context.onToggleHovedmeny}
            open={context.visHovedmeny}
          >
            <List className="hamburger_sidebar">
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
                <h2>Hva vil du utforske?</h2>
                <Menyelement
                  icon={
                    <img
                      src="/logoer/small_icon_grey_two.png"
                      className="logo_image"
                      alt="artsdatabanken logo"
                    />
                  }
                  primary="Forside"
                  onClick={() => {
                    this.handleClick("/");
                    context.onToggleHovedmeny();
                  }}
                />
                <Utforsk parent={this} props={this} context={context} />

                <Divider />

                <Menyelement
                  icon={<HelpOutline />}
                  primary="Hjelp"
                  onClick={() => {
                    this.handleClick("/Natur_i_Norge/hjelp");
                    context.onToggleHovedmeny();
                  }}
                />
                <Divider />
                <h2>Datagrunnlag</h2>
                <Menyelement
                  icon={<CloudDownload />}
                  primary="Last ned data"
                  onClick={() => {
                    this.handleWindowOpen("https://data.artsdatabanken.no/");
                    context.onToggleHovedmeny();
                  }}
                />
                <Menyelement
                  onClick={() => {
                    this.handleWindowOpen(
                      "https://github.com/Artsdatabanken/nin-kart-frontend/wiki/%C3%98nsker-du-%C3%A5-bidra-med-data%3F"
                    );
                    context.onToggleHovedmeny();
                  }}
                  icon={<CloudUpload />}
                  primary="Levere data"
                />

                <Menyelement
                  onClick={() => {
                    this.handleClick("/Datakilde/");
                    context.onToggleHovedmeny();
                  }}
                  icon={<AssignmentInd />}
                  primary="Datakilder"
                />
                <Menyelement
                  onClick={() => {
                    this.handleWindowOpen(
                      "https://github.com/Artsdatabanken/nin-kart-frontend"
                    );
                    context.onToggleHovedmeny();
                  }}
                  icon={<GitHub />}
                  primary="Kildekode"
                />
                {/*
                <Menyelement
                  onClick={() => {
                    this.handleClick("/forvaltningsportalen/");
                    context.onToggleHovedmeny();
                  }}
                  icon={<AssignmentInd />}
                  primary="Forvaltningsportalen"
                />*/}
                <Divider />
                <Innstillinger
                  visKoder={context.visKoder}
                  sorterPåKode={context.sorterPåKode}
                  onUpdateSetting={context.onUpdateValue}
                  onNavigate={this.handleNavigate}
                  spraak={spraak}
                  handleSpraak={handleSpraak}
                />
                <Divider />
                <h2>Kontakt</h2>

                <button
                  className="tilbakemeldinger"
                  onClick={() => {
                    this.handleWindowOpen(
                      "https://github.com/Artsdatabanken/nin-kart-frontend/issues"
                    );
                    context.onToggleHovedmeny();
                  }}
                >
                  <Comment /> <span>Tilbakemeldinger</span> <OpenInNew />
                </button>

                <button
                  className="artsdatabanken"
                  onClick={() => {
                    this.handleWindowOpen("https://artsdatabanken.no");
                    context.onToggleHovedmeny();
                  }}
                >
                  <BildeAvatar url="Datakilde/Artsdatabanken" />{" "}
                  <span>Artsdatabanken</span> <KeyboardArrowRight />
                </button>
              </div>
            </List>
          </SwipeableDrawer>
        )}
      </SettingsContext.Consumer>
    );
  }

  handleClick = what => this.props.history.push(what);
  handleWindowOpen = what => window.open(what);
  handleClickMap = () => this.handleWindowOpen("/");
  handleNavigate = url => this.props.history.push(url);
}

export default withRouter(HamburgerMeny);
