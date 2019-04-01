import { Input } from "@material-ui/core";
import React, { useEffect, useRef } from "react";

const SearchBox = ({
  isSearching,
  onBlur,
  onQueryChange,
  query,
  className
}) => {
  const inputEl = useRef(null);
  useEffect(() => {
    if (isSearching) inputEl.current.focus();
  }, [isSearching]);
  return (
    <Input
      inputRef={inputEl}
      value={query}
      placeholder={"Søk i Natur i Norge"}
      onBlur={onBlur}
      onChange={onQueryChange}
      fullWidth={true}
      disableUnderline={true}
      classes={{ input: className }}
      className={className}
    />
  );
};

export default SearchBox;
