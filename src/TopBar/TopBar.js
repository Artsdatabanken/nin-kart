import React, { useEffect, useState } from "react";
import ResultatListe from "./ResultatListe";
import Searchbar from "./Searchbar/Searchbar";
import "./../style/TopBar.css";
import { SettingsContext } from "../SettingsContext";
import Hamburger from "@material-ui/icons/Menu";
import backend from "../Funksjoner/backend";

const TopBar = ({ onSelectResult, searchFor }) => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState();
  useEffect(() => {
    if (searchFor) setQuery(searchFor);
  }, [searchFor]);

  useEffect(() => {
    if (!query) return setHits([]);
    const fetchData = async () => {
      const response = await backend.søk(query.replace(/\//g, "-"));
      setHits(response.result);
    };
    fetchData();
  }, [query]);
  return (
    <SettingsContext.Consumer>
      {context => (
        <div className="top_bar">
          <button
            className="invisible_icon_button hamburger"
            onKeyDown={e => {
              if (e.keyCode === 13) {
                context.onToggleHovedmeny();
              }
            }}
            onClick={context.onToggleHovedmeny}
          >
            <Hamburger />
          </button>

          <div className="header_text">
            <img
              src="/logoer/small_icon_two.png"
              className="logo_image"
              alt="artsdatabanken logo"
            />
            <span>NiN-Kart</span>
          </div>

          <Searchbar
            setHits={setHits}
            onQueryChange={e => setQuery(e.target.value)}
            hits={hits}
          />

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
