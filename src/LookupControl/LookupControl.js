import classNames from "classnames";
import { AppBar, Toolbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import NavigationBack from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";
import Hamburger from "@material-ui/icons/Menu";
import Search from "@material-ui/icons/Search";
import React, { useState, useEffect } from "react";
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

const abc = (cl, isSearching) => classNames(cl, isSearching && "mobile_active");

const LookupControl = ({ query, classes, onQueryChange }) => {
  const [isSearching, setIsSearching] = useState(false);
  console.log(abc("input_imitator", isSearching));
  return (
    <SettingsContext.Consumer>
      {context => (
        <div className={abc("input_imitator", isSearching)}>
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
            <div class="mobile_version" />
            <SearchBox
              className={abc("mobile_version", isSearching)}
              isSearching={isSearching}
              query={query}
              onFocus={() => {}}
              onBlur={() => {
                return setIsSearching(false);
              }}
              onQueryChange={onQueryChange}
              onExitToRoot={() => {}}
              onKeyEnter={() => {}}
              isAtRoot={true}
            />
            <Search
              className={abc("search_icon", isSearching)}
              onClick={() => setIsSearching(true)}
            />

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
};

export default withRouter(withStyles(styles)(LookupControl));
