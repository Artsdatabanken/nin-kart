import classNames from "classnames";
import Search from "@material-ui/icons/Search";
import Close from "@material-ui/icons/Close";
import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import SearchBox from "./SearchField/SearchField";
import { SettingsContext } from "../SettingsContext";

const abc = (cl, isSearching) => classNames(cl, isSearching && "mobile_active");

const Searchbar = ({ query, classes, onQueryChange }) => {
  const [isSearching, setIsSearching] = useState(false);
  return (
    <SettingsContext.Consumer>
      {context => (
        <div className={abc("searchbar_container", isSearching)}>
          {/*
              <button className="invisible_icon_button"
                  onClick={this.props.onGoBack}
                  className={classes.darkButton}
                >
                  <NavigationBack />
                </button>
              */}

          <div className={abc("mobile_version", isSearching)} />
          <input
            //inputRef={useRef(null)}
            value={query}
            placeholder={"Søk i Natur i Norge"}
            onBlur={() => {
              return setIsSearching(false);
            }}
            onChange={onQueryChange}
            fullWidth={true}
            disableUnderline={true}
          />

          {!isSearching ? (
            <button
              onClick={() => setIsSearching(true)}
              className="invisible_icon_button search_icon"
            >
              <Search />
            </button>
          ) : (
            <button
              onClick={() => setIsSearching(false)}
              className="invisible_icon_button search_icon"
            >
              <Close />
            </button>
          )}

          {/*
              {!this.props.isAtRoot && (
                <button className="invisible_icon_button"
                  onClick={this.props.onExitToRoot}
                  className={classes.lightButton}
                >
                  <CloseIcon />
                )}
              </button>*/}
        </div>
      )}
    </SettingsContext.Consumer>
  );
};

export default withRouter(Searchbar);
