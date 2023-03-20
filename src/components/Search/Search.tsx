import classes from "./index.module.scss";
import React from "react";

type SearchProps = {
  fetchCharactersByInput: (searchInput: string) => void;
  clearResults: () => void;
};

export default function Search({
  fetchCharactersByInput: fetchCharactersByInput,
  clearResults,
}: SearchProps) {
  const searchQuery = window.localStorage.getItem("searchQuery")
    ? window.localStorage.getItem("searchQuery")
    : "";
  const [searchInput, setSearchInput] = React.useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = React.useState(
    searchQuery ? searchQuery : ""
  );

  React.useEffect(() => {
    const timer = setTimeout(() => setSearchInput(debouncedSearchInput), 1000);
    return () => clearTimeout(timer);
  }, [debouncedSearchInput]);

  React.useEffect(() => {
    if (searchInput !== "") {
      fetchCharactersByInput(searchInput);
      window.localStorage.setItem("searchQuery", searchInput);
    } else clearResults();
  }, [searchInput]);

  React.useEffect(() => {
    window.onbeforeunload = function () {
      window.localStorage.clear();
      return true;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <input
      className={classes.input}
      id="search"
      placeholder="Filter by name..."
      value={debouncedSearchInput}
      onChange={(e) => setDebouncedSearchInput(e.target.value)}
    />
  );
}
