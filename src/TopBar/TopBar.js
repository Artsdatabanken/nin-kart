import { withRouter } from "react-router";
import React, { useEffect, useState } from "react";
import ResultatListe from "../Kodetre/Kodeliste/ResultatListe";
import LookupControl from "../LookupControl/LookupControl";
import axios from "axios";
import "./TopBar.css";

// Ny fancy

const TopBar = ({ history }) => {
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
    <>
      <LookupControl onQueryChange={e => setQuery(e.target.value)} />
      <ResultatListe
        query={query}
        searchResults={hits}
        onSelect={item => {
          setQuery(null);
          history.push("/" + item.url);
        }}
      />
    </>
  );
};

export default withRouter(TopBar);
