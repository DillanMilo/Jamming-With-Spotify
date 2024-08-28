import React from "react";
import { TrackType } from "../Types";

type TrackProps = {
  track: TrackType;
  onAdd?: (track: TrackType) => void;
  onRemove?: (track: TrackType) => void;
  isAdded?: boolean;
  isRemoval?: boolean;
};

const Track = ({ track, onAdd, onRemove, isAdded, isRemoval }: TrackProps) => {
  return (
    <div className="track-box">
      <p className="track-title">{track.title}</p>
      <p className="track-artist">{track.artist}</p>
      {!isRemoval ? (
        <button
          className={isAdded ? "track-button-added" : "track-button-add"}
          onClick={() => onAdd && onAdd(track)}
          disabled={isAdded}
        >
          {isAdded ? "✔ Added" : "+ Add to Playlist"}
        </button>
      ) : (
        <button
          className="track-button-remove"
          onClick={() => onRemove && onRemove(track)}
        >
          - Remove from Playlist
        </button>
      )}
    </div>
  );
};

export default Track;
