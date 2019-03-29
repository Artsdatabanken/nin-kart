import React, { useEffect, useState } from "react";
import ResultatListe from "../Kodetre/Kodeliste/ResultatListe";
import LookupControl from "../LookupControl/LookupControl";
import axios from "axios";
import "./TopBar.css";

// Ny fancy

const TopBar = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState();

  useEffect(() => {
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
        {/*}
        <div className="top_menu_item">Naturtyper</div>
        <div className="top_menu_item">Landskap</div>
        <div className="top_menu_item">Statistikk for Art</div>
  */}
        <h1>Natur i Norge</h1>
      </div>
      <ResultatListe query={query} searchResults={hits} />
    </div>
  );
};

export default TopBar;
