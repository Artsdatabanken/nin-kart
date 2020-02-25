import React, { useEffect, useRef, useState } from "react";
import ResultatListe from "./ResultatListe";
import Searchbar from "./Searchbar/Searchbar";
import "./../style/TopBar.scss";
import { SettingsContext } from "../SettingsContext";
import Hamburger from "@material-ui/icons/Menu";
import backend from "../Funksjoner/backend";

const TopBar = ({ onSelectResult, searchFor, forside, history }) => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState(null);
  const latestQuery = useRef();

  useEffect(() => {
    if (searchFor) setQuery(searchFor);
  }, [searchFor]);
  useEffect(() => {
    const fetchData = async () => {
      latestQuery.current = query;
      if (query === null) return setHits([]);
      const response = await backend.søk((query || "").replace(/\//g, "-"));
      if (query === latestQuery.current) setHits(response.result);
    };
    fetchData();
  }, [query]);
  return (
    <SettingsContext.Consumer>
      {context => (
        <div className={!forside ? "top_bar" : "top_bar forside_topbar"}>
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
          {!forside && (
            <div
              className="header_text"
              onClick={() => {
                history.push("/");
              }}
            >
              <img
                src="/logoer/small_icon_two.png"
                className="logo_image"
                alt="artsdatabanken logo"
              />
              <span>NiN-Kart</span>
            </div>
          )}

          <div className="search_elements_container">
            <Searchbar
              query={query}
              setHits={setHits}
              onQueryChange={setQuery}
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
        </div>
      )}
    </SettingsContext.Consumer>
  );
};

export default TopBar;
