import React, { useEffect, useRef } from "react";

const SearchBox = ({ isSearching, onBlur, onQueryChange, query }) => {
  const inputEl = useRef(null);
  useEffect(() => {
    if (isSearching) inputEl.current.focus();
  }, [isSearching]);
  return (
    <input
      inputRef={inputEl}
      value={query}
      placeholder={"Søk i Natur i Norge"}
      onBlur={onBlur}
      onChange={onQueryChange}
      fullWidth={true}
      disableUnderline={true}
    />
  );
};

export default SearchBox;
