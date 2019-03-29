import { AppBar, Toolbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import NavigationBack from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";
import Hamburger from "@material-ui/icons/Menu";
import Search from "@material-ui/icons/Search";
import React from "react";
import { withRouter } from "react-router-dom";
import SearchBox from "./SearchField/SearchField";
import { SettingsContext } from "../SettingsContext";

const styles = {
  root: {},
  toolbar: {
    padding: 0
  },
  squareBottom: {
    borderRadius: "4px 4px 0 0"
  },
  darkButton: {
    color: "#616161"
  },
  lightButton: {
    color: "#b4b4b4"
  }
};

class LookupControl extends React.Component {
  render() {
    const { query, classes } = this.props;
    return (
      <SettingsContext.Consumer>
        {context => (
          <div className="input_imitator">
            <Toolbar variant="dense" className={classes.toolbar}>
              <IconButton
                onClick={context.onToggleHovedmeny}
                className={classes.darkButton}
              >
                <Hamburger />
              </IconButton>
              {/*
              <IconButton
                  onClick={this.props.onGoBack}
                  className={classes.darkButton}
                >
                  <NavigationBack />
                </IconButton>
              */}
              <SearchBox
                query={query}
                onFocus={() => {}}
                onBlur={() => {}}
                onQueryChange={this.props.onQueryChange}
                onExitToRoot={() => {}}
                onKeyEnter={() => {}}
                isAtRoot={true}
              />

              <IconButton className={classes.lightButton}>
                <Search />
              </IconButton>
              {/*
              {!this.props.isAtRoot && (
                <IconButton
                  onClick={this.props.onExitToRoot}
                  className={classes.lightButton}
                >
                  <CloseIcon />
                )}
              </IconButton>*/}
            </Toolbar>
          </div>
        )}
      </SettingsContext.Consumer>
    );
  }
}

export default withRouter(withStyles(styles)(LookupControl));
