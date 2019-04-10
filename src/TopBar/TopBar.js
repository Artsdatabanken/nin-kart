import React, { useEffect, useState } from "react";
import ResultatListe from "../Kodetre/Kodeliste/ResultatListe";
import LookupControl from "../LookupControl/LookupControl";
import axios from "axios";
import "./../style/TopBar.css";

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
    <div className="top_expander">
      <div className="top_menu">
        <LookupControl onQueryChange={e => setQuery(e.target.value)} />
        <img
          src="/logoer/adb32.png"
          className="logo_image"
          alt="artsdatabanken logo"
        />

        <h1>
          Natur i Norge{" "}
          <img
            src="https://data.artsdatabanken.no/Datakilde/Artsdatabanken/avatar_40.png"
            alt="artsdatabanken liten logo"
          />
        </h1>
      </div>
      <ResultatListe
        query={query}
        searchResults={hits}
        onSelect={item => {
          setQuery(null);
          onSelectResult(item);
        }}
      />
    </div>
  );
};

export default TopBar;
