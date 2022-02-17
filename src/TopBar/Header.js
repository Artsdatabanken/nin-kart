import React, { useEffect } from "react";
import importScript from "../Funksjoner/getExternal";
import TopBar from "./TopBar";

const Header = ({ searchFor, handleHovedMeny, onSelectResult, history }) => {
  const headerjsurl = "https://design.artsdatabanken.no/script/header.js";
  useEffect(() => {
    importScript(headerjsurl);
  }, [headerjsurl]);

  return (
    <div className="adb-dropdown-wrap">
      <header className={"top_bar adb-topbar header"}>
        <div class="width-adjuster">
          <a href="https://artsdatabanken.no" class="header-logo">
            <img
              alt="Artsdatabanken"
              src="https://artsdatabanken.no/Files/20973"
              className="normal"
            />
            <img
              alt="Artsdatabanken"
              src="https://artsdatabanken.no/Files/20978"
              className="mobile"
            />
          </a>
          <button id="navbar-mobile" class="material-icons">
            menu
          </button>
          <nav id="headermenu" class="hide"></nav>
        </div>
      </header>
      <TopBar
        searchFor={searchFor}
        handleHovedMeny={handleHovedMeny}
        onSelectResult={onSelectResult}
        history={history}
      />
    </div>
  );
};

export default Header;
