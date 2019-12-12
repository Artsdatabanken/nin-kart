import classNames from "classnames";
import { AppBar, Toolbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import NavigationBack from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";
import Hamburger from "@material-ui/icons/Menu";
import Search from "@material-ui/icons/Search";
import React from "react";
import { withRouter } from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox";
import { SettingsContext } from "../SettingsContext";

const styles = {
  root: {
    position: "fixed",
    left: 8,
    top: 8,
    width: 392,
    backgroundColor: "#fff",
    zIndex: 12
  },
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

type Props = {
  tittel: string,
  query: string,
  onClick: Function,
  onFocus: Function,
  onBlur: Function,
  onQueryChange: Function,
  isAtRoot: Boolean,
  hasResults: Boolean,
  onToggleMainDrawer: Function,
  onExitToRoot: Function,
  classes: Object,
  children: Object
};

class TopBar extends React.Component<Props> {
  render() {
    const {
      query,
      searchFor,
      classes,
      onFocus,
      onBlur,
      hasResults
    } = this.props;
    return (
      <SettingsContext.Consumer>
        {context => (
          <AppBar
            position="sticky"
            className={classNames(
              classes.root,
              hasResults && classes.squareBottom
            )}
            square={false}
          >
            <Toolbar variant="dense" className={classes.toolbar}>
              {this.props.isAtRoot ? (
                <IconButton
                  onClick={context.onToggleHovedmeny}
                  className={classes.darkButton}
                >
                  <Hamburger />
                </IconButton>
              ) : (
                <IconButton
                  onClick={this.props.onGoBack}
                  className={classes.darkButton}
                >
                  <NavigationBack />
                </IconButton>
              )}
              <SearchBox
                query={query}
                searchFor={searchFor}
                onFocus={onFocus}
                onBlur={onBlur}
                onQueryChange={this.props.onQueryChange}
                onExitToRoot={this.props.onExitToRoot}
                onKeyEnter={this.props.onKeyEnter}
                isAtRoot={this.props.isAtRoot}
              />
              <IconButton className={classes.lightButton}>
                <Search />
              </IconButton>
              {!this.props.isAtRoot && (
                <IconButton
                  onClick={this.props.onExitToRoot}
                  className={classes.lightButton}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Toolbar>
            {this.props.children}
          </AppBar>
        )}
      </SettingsContext.Consumer>
    );
  }
}

export default withRouter(withStyles(styles)(TopBar));
