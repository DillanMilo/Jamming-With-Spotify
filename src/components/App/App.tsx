// App.tsx
import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "./SearchResults/SearchResults";
import Playlist from "./Playlist/Playlist";
import { TrackType } from "./Types";
import {
  checkForAccessToken,
  searchSpotify,
  getAccessToken,
  getUserId,
  createPlaylist,
  addTracksToPlaylist,
} from "./Spotify";

function App() {
  // State to store search results
  const [searchResults, setSearchResults] = useState<TrackType[]>([]);

  // State to store the user's playlist tracks
  const [playlistTracks, setPlaylistTracks] = useState<TrackType[]>([]);

  // State to store the playlist name
  const [playlistName, setPlaylistName] = useState("New Playlist");

  // Function to add a track to the playlist
  const addTrackToPlaylist = (trackToAdd: TrackType) => {
    if (playlistTracks.find((track) => track.id === trackToAdd.id)) {
      return;
    }
    setPlaylistTracks((previousTracks) => [...previousTracks, trackToAdd]);
  };

  // Function to remove a track from the playlist
  const removeTrackFromPlaylist = (trackToRemove: TrackType) => {
    setPlaylistTracks(
      playlistTracks.filter((track) => track.id !== trackToRemove.id)
    );
  };

  // Function to handle the change of the playlist name
  const handleNameChange = (name: string) => {
    setPlaylistName(name);
  };

  // Function to save the playlist to Spotify
  const savePlaylist = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      console.log("Access token is not available.");
      return;
    }

    if (!playlistName || !playlistTracks.length) {
      console.log("Playlist name or tracks are missing.");
      return;
    }

    const trackUris = playlistTracks.map((track) => track.uri);
    try {
      const userId = await getUserId(accessToken);
      const playlistId = await createPlaylist(
        userId,
        playlistName,
        accessToken
      );
      await addTracksToPlaylist(playlistId, trackUris, accessToken);

      // Reset the existing playlist on the web app
      setPlaylistTracks([]);
      setPlaylistName("New Playlist");
      console.log("Playlist saved to Spotify!");
    } catch (error) {
      console.error("Error saving playlist:", error);
    }
  };

  // Function to handle search
  const handleSearch = async (term: string) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      const searchResults = await searchSpotify(term, accessToken);
      setSearchResults(searchResults);
    } else {
      console.log("Access token is not available.");
    }
  };

  // Initialize Spotify authentication on app load
  useEffect(() => {
    checkForAccessToken();
  }, []);

  return (
    <div className="App">
      <h1>JamMming</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResults searchResults={searchResults} onAdd={addTrackToPlaylist} />
      <Playlist
        tracks={playlistTracks}
        onRemove={removeTrackFromPlaylist}
        onSave={savePlaylist}
        playlistName={playlistName}
        onNameChange={handleNameChange}
      />
    </div>
  );
}

export default App;
