import React, { useEffect, useRef, useState } from "react";
import ResultatListe from "./ResultatListe";
import Searchbar from "./Searchbar/Searchbar";
import "./../style/TopBar.scss";
import Hamburger from "@material-ui/icons/Menu";
import backend from "../Funksjoner/backend";
import { useNavigate } from 'react-router-dom'

const TopBar = ({ onSelectResult, searchFor, onToggleHovedMeny }) => {
  const navigate = useNavigate();
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
    <div className={"top_bar"}>
      {false && <div className="adb-topbar">Artsdtabanken</div>}
      <div className="nin-topbar">
        <button
          className="invisible_icon_button hamburger"
          onKeyDown={e => {
            if (e.keyCode === 13) {
              onToggleHovedMeny();
            }
          }}
          onClick={e => {
            onToggleHovedMeny();
          }}
        >
          <Hamburger />
        </button>

        <div
          className="header_text"
          onClick={() => {
            navigate("/");
          }}
        >
          <span style={{ fontWeight: 500 }}>NiN-kart</span>
          {false && (
            <img
              src="/logoer/small_icon_two.png"
              className="logo_image"
              alt="artsdatabanken logo"
            />
          )}
        </div>

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
    </div>
  );
};

export default TopBar;
