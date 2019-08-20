import Menyelement from "./Menyelement";
import { SettingsContext } from "SettingsContext";
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
import NavigationChevronLeftDouble from "AppSettings/NavigationChevronLeftDouble";
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
            className="hamburger_sidebar"
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
                <ListSubheader>Hva vil du utforske?</ListSubheader>
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
                  icon={<Info />}
                  primary="Informasjon"
                  onClick={() => {
                    this.handleClick("?hjelp");
                    context.onToggleHovedmeny();
                  }}
                />
                <Divider />
                <ListSubheader>Datagrunnlag</ListSubheader>
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
                    this.handleWindowOpen(
                      "https://github.com/Artsdatabanken/nin-kart-frontend/issues"
                    );
                    context.onToggleHovedmeny();
                  }}
                  icon={<Comment />}
                  primary="Tilbakemeldinger"
                />

                <Menyelement
                  onClick={() => {
                    this.handleWindowOpen("https://artsdatabanken.no");
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

  handleClick = what => this.props.history.push(what);
  handleWindowOpen = what => window.open(what);
  handleClickMap = () => this.handleWindowOpen("/");
  handleNavigate = url => this.props.history.push(url);
}

export default withRouter(HamburgerMeny);
