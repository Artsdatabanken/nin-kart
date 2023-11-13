import React, { useEffect } from "react";
import importScript from "../Funksjoner/getExternal";
import TopBar from "./TopBar";

const Header = ({ searchFor, onToggleHovedMeny, onSelectResult, history }) => {
  const headerjsurl = "https://design.artsdatabanken.no/script/header.js";
  useEffect(() => {
    importScript(headerjsurl);
  }, [headerjsurl]);

  return (
    <div className="adb-dropdown-wrap">
      <header className={"top_bar adb-topbar header"}>
        <div className="width-adjuster">
          <a href="https://artsdatabanken.no" className="header-logo">
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
          <button id="navbar-mobile" className="material-icons">
            menu
          </button>
          <nav id="headermenu" className="hide"></nav>
        </div>
      </header>
      <TopBar
        searchFor={searchFor}
        onToggleHovedMeny={onToggleHovedMeny}
        onSelectResult={onSelectResult}
        history={history}
      />
    </div>
  );
};

export default Header;