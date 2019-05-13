import React, { useEffect, useState } from "react";
import ResultatListe from "./ResultatListe";
import Searchbar from "../Searchbar/Searchbar";
import axios from "axios";
import "./../style/TopBar.css";

import { SettingsContext } from "../SettingsContext";

import Hamburger from "@material-ui/icons/Menu";

const TopBar = ({ onSelectResult }) => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState();

  useEffect(() => {
    if (!query) return setHits([]);

    const fetchData = async () => {
      const result = await axios("https://ogapi.artsdatabanken.no/" + query);
      setHits(result.data.result);
    };
    fetchData();
  }, [query]);
  return (
    <SettingsContext.Consumer>
      {context => (
        <div className="top_anchor">
          <button className="invisible_icon_button hamburger">
            <Hamburger onClick={context.onToggleHovedmeny} />
          </button>

          <Searchbar onQueryChange={e => setQuery(e.target.value)} />

          <img
            src="/logoer/adb32.png"
            className="logo_image"
            alt="artsdatabanken logo"
          />
          {/* 
        <h1>
          Natur i Norge{" "}
          <img
            src="https://data.artsdatabanken.no/Datakilde/Artsdatabanken/avatar_40.png"
            alt="artsdatabanken liten logo"
          />
        </h1>
        */}

          <ResultatListe
            query={query}
            searchResults={hits}
            onSelect={item => {
              setQuery(null);
              onSelectResult(item);
            }}
          />
        </div>
      )}
    </SettingsContext.Consumer>
  );
};

export default TopBar;
