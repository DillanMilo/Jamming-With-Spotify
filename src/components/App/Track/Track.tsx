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
      {/* Add album artwork */}
      {track.albumImageUrl && (
        <img
          src={track.albumImageUrl}
          alt={track.title}
          className="track-album-image"
          style={{ width: "100px", height: "100px", borderRadius: "8px" }}
        />
      )}

      <p className="track-title">{track.title}</p>
      <p className="track-artist">{track.artist}</p>

      {/* Add / Remove buttons */}
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
