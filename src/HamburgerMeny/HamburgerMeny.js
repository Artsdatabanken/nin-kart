import Menyelement from "./Menyelement";
import { SettingsContext } from "../SettingsContext";
import {
  Divider,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  ListItemSecondaryAction
} from "@material-ui/core";
import {
  OpenInNew,
  CloudUpload,
  CloudDownload,
  Comment,
  HelpOutline,
  AssignmentInd
} from "@material-ui/icons";
import React, { Component } from "react";
import { withRouter } from "../withRouter";
import NavigationChevronLeftDouble from "../AppSettings/NavigationChevronLeftDouble";
import GitHub from "./GitHub";
import Innstillinger from "./Innstillinger";
import Utforsk from "./Utforsk/Utforsk";
import config from "../Funksjoner/config";

class HamburgerMeny extends Component {
  render() {
    let spraak = this.props.spraak;
    const { handleSpraak, onToggleHovedMeny } = this.props;
    return (
      <SettingsContext.Consumer>
        {context => (
          <SwipeableDrawer
            className="hamburger_sidebar"
            anchor="left"
            onClose={onToggleHovedMeny}
            onOpen={onToggleHovedMeny}
            open={this.props.open}
          >
            <List className="hamburger_sidebar">
              <ListItem>
                <ListItemText
                  primary={
                    <Typography
                      style={{ fontWeigtht: 500, color: "#777" }}
                      variant="h6"
                    >
                      Natur i Norge
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={onToggleHovedMeny}>
                    <NavigationChevronLeftDouble />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />

              <div>
                <Utforsk
                  parent={this}
                  props={this}
                  context={context}
                  onToggleHovedMeny={onToggleHovedMeny}
                />
                <Menyelement
                  onClick={() => {
                    this.handleClick("/Datakilde/");
                    this.props.onToggleHovedMeny();
                  }}
                  icon={<AssignmentInd />}
                  primary="Datakilder"
                />
                <Menyelement
                  icon={<HelpOutline />}
                  primary="Hjelp"
                  onClick={() => {
                    this.props.handleHelp();
                    this.props.onToggleHovedMeny();
                  }}
                />
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
                <button
                  className="tilbakemeldinger"
                  onClick={() => {
                    this.handleWindowOpen(
                      "https://github.com/Artsdatabanken/nin-kart-frontend/issues"
                    );
                    this.props.onToggleHovedMeny();
                  }}
                >
                  <Comment /> <span>Gi tilbakemelding</span> <OpenInNew />
                </button>
                <Menyelement
                  outgoing={<OpenInNew />}
                  icon={<CloudDownload />}
                  primary="Last ned data"
                  onClick={() => {
                    this.handleWindowOpen("https://data.artsdatabanken.no/");
                    this.props.onToggleHovedMeny();
                  }}
                />
                <Menyelement
                  outgoing={<OpenInNew />}
                  onClick={() => {
                    this.handleWindowOpen(
                      "https://github.com/Artsdatabanken/nin-kart-frontend/wiki/%C3%98nsker-du-%C3%A5-bidra-med-data%3F"
                    );
                    this.props.onToggleHovedMeny();
                  }}
                  icon={<CloudUpload />}
                  primary="Levere data"
                />

                <Menyelement
                  outgoing={<OpenInNew />}
                  onClick={() => {
                    this.handleWindowOpen(
                      "https://github.com/Artsdatabanken/nin-kart-frontend"
                    );
                    this.props.onToggleHovedMeny();
                  }}
                  icon={<GitHub />}
                  primary="Kildekode"
                />
                <Divider />

                <Menyelement
                  onClick={() => {
                    this.handleWindowOpen("https://artsdatabanken.no");
                    this.props.onToggleHovedMeny();
                  }}
                  icon={
                    <img
                      alt="Artsdatabanken logo"
                      src={config.logo(
                        "Datakilde/Artsdatabanken".split("?")[0]
                      )}
                    />
                  }
                  primary="Artsdatabanken"
                />
              </div>
            </List>
          </SwipeableDrawer>
        )}
      </SettingsContext.Consumer>
    );
  }

  handleClick = what => this.props.navigate(what);
  handleWindowOpen = what => window.open(what);
  handleClickMap = () => this.handleWindowOpen("/");
  handleNavigate = url => this.props.navigate(url);
}

export default withRouter(HamburgerMeny);
