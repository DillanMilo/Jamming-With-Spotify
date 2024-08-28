// Remove Chakra UI imports
import React, { useState } from "react";
import "../../global.css";

const SearchBar = ({
  onSearch,
  onReset,
  hasSearched,
}: {
  onSearch: Function;
  onReset: Function;
  hasSearched: boolean;
}) => {
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    onSearch(term);
  };

  const handleReset = () => {
    setTerm(""); // Clear the search term
    onReset(); // Call the reset function passed from the parent component
  };

  return (
    <div className="search-bar-container">
      <div className="input-group">
        <input
          type="text"
          placeholder="Search songs, artists, albums..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="search-input"
        />
      </div>
      {!hasSearched ? (
        <button onClick={handleSearch}>Search</button>
      ) : (
        <a href="#" onClick={handleReset}>
          Back
        </a>
      )}
    </div>
  );
};

export default SearchBar;
