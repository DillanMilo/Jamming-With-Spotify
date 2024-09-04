import React from "react";
import Track from "../Track/Track";
import { TrackType } from "../Types";

type SearchResultsProps = {
  searchResults: TrackType[];
  onAdd: (track: TrackType) => void;
  addedTracks: { [key: string]: boolean }; // This object will hold the added state of each track
};

const SearchResults = ({
  searchResults,
  onAdd,
  addedTracks,
}: SearchResultsProps) => {
  return (
    <div className="search-results-grid">
      {searchResults.map((track) => (
        <Track
          key={track.id}
          track={track}
          onAdd={onAdd}
          isAdded={addedTracks[track.id]} // Pass the isAdded prop to Track
        />
      ))}
    </div>
  );
};

export default SearchResults;
