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
  ListItemSecondaryAction,
} from "@material-ui/core";
import {
  OpenInNew,
  CloudUpload,
  CloudDownload,
  Comment,
  HelpOutline,
  AssignmentInd,
} from "@material-ui/icons";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NavigationChevronLeftDouble from "../AppSettings/NavigationChevronLeftDouble";
import GitHub from "./GitHub";
import Innstillinger from "./Innstillinger";
import Utforsk from "./Utforsk/Utforsk";
import config from "../Funksjoner/config";

class HamburgerMeny extends Component {
  render() {
    let spraak = this.props.spraak;
    const handleSpraak = this.props.handleSpraak;
    return (
      <SettingsContext.Consumer>
        {(context) => (
          <SwipeableDrawer
            className="hamburger_sidebar"
            anchor="left"
            onClose={context.onToggleHovedmeny}
            onOpen={context.onToggleHovedmeny}
            open={context.visHovedmeny}
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
                  <IconButton onClick={context.onToggleHovedmeny}>
                    <NavigationChevronLeftDouble />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />

              <div>
                <Utforsk parent={this} props={this} context={context} />

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
                <Menyelement
                  icon={<HelpOutline />}
                  primary="Hjelp"
                  onClick={() => {
                    this.handleClick("?hjelp");
                    context.onToggleHovedmeny();
                  }}
                />
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

                <Menyelement
                  onClick={() => {
                    this.handleWindowOpen("https://artsdatabanken.no");
                    context.onToggleHovedmeny();
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

  handleClick = (what) => this.props.history.push(what);
  handleWindowOpen = (what) => window.open(what);
  handleClickMap = () => this.handleWindowOpen("/");
  handleNavigate = (url) => this.props.history.push(url);
}

export default withRouter(HamburgerMeny);
