import useStartTyping from "react-use/lib/useStartTyping";
import classNames from "classnames";
import Search from "@material-ui/icons/Search";
import Close from "@material-ui/icons/Close";
import React, { useRef } from "react";
import { withRouter } from "react-router-dom";

const abc = (cl, isSearching) => classNames(cl, isSearching && "mobile_active");

const Searchbar = ({ query, onQueryChange, hits, setHits }) => {
  const isSearching = query != null;
  function close_dropdown() {
    onQueryChange(null);
  }
  const inputField = useRef(null);
  useStartTyping(() => {
    inputField.current.focus();
    onQueryChange("");
  });

  return (
    <div className={abc("searchbar_container", isSearching)}>
      <input
        ref={inputField}
        value={query}
        placeholder={"Søk i Natur i Norge"}
        onChange={e => {
          onQueryChange(e.target.value);
        }}
      />

      {!isSearching && hits.length === 0 ? (
        <button
          onClick={() => {
            // Logikk for at på mobil skal denne ikke kunne endres før
            // hits.length endrer seg. men på desktop skal den alltid kunne søke.

            inputField.current.focus();
            onQueryChange("");

            // AKTIVER SØK FrA SØKEFELTET om den ikke er aktivert
          }}
          className="invisible_icon_button search_icon"
        >
          <Search />
        </button>
      ) : (
        <>
          <div
            className="background_click_collector"
            onKeyDown={() => close_dropdown()}
            onMouseDown={() => close_dropdown()}
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
  );
};

export default withRouter(Searchbar);
