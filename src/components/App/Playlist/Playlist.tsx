import React, { useState } from "react";
import Track from "../Track/Track";
import { TrackType } from "../Types";

type PlaylistProps = {
  tracks: TrackType[];
  onRemove: (track: TrackType) => void;
  onSave: (name: string) => void;
  playlistName: string;
  onNameChange: (name: string) => void;
};

const Playlist = ({
  tracks,
  onRemove,
  onSave,
  playlistName,
  onNameChange,
}: PlaylistProps) => {
  const [editName, setEditName] = useState(playlistName);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(event.target.value);
    onNameChange(event.target.value);
  };

  const handleSave = () => {
    onSave(editName);
  };

  return (
    <div className="playlist-box">
      <input
        value={editName}
        onChange={handleNameChange}
        className="playlist-input"
      />
      <div className="track-list">
        {tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            onRemove={onRemove}
            isRemoval={true}
          />
        ))}
      </div>
      <button className="save-button" onClick={handleSave}>
        Save to Spotify
      </button>
    </div>
  );
};

export default Playlist;
