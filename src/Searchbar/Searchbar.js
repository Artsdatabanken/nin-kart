import classNames from "classnames";
import Search from "@material-ui/icons/Search";
import Close from "@material-ui/icons/Close";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { SettingsContext } from "../SettingsContext";

const abc = (cl, isSearching) => classNames(cl, isSearching && "mobile_active");

const Searchbar = ({ query, onQueryChange, hits, setHits }) => {
  const [isSearching, setIsSearching] = useState(false);

  function close_dropdown() {
    setIsSearching(false);
    setHits([]);
  }

  return (
    <SettingsContext.Consumer>
      {context => (
        <div className={abc("searchbar_container", isSearching)}>
          <div className={abc("mobile_version", isSearching)} />
          <input
            value={query}
            placeholder={"Søk i Natur i Norge"}
            onBlur={() => {
              return setIsSearching(false);
            }}
            onChange={onQueryChange}
          />

          {!isSearching && hits.length === 0 ? (
            <button
              onClick={() => setIsSearching(true)}
              className="invisible_icon_button search_icon"
            >
              <Search />
            </button>
          ) : (
            <>
              <div
                className="background_click_collector"
                onClick={() => close_dropdown()}
              />
              <button
                onClick={() => close_dropdown()}
                className="invisible_icon_button search_icon"
              >
                <Close />
              </button>
            </>
          )}
        </div>
      )}
    </SettingsContext.Consumer>
  );
};

export default withRouter(Searchbar);
