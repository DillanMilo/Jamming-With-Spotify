import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "./SearchResults/SearchResults";
import Playlist from "./Playlist/Playlist";
import SavePlaylistAlert from "./Playlist/SavePlaylistAlert";
import JammmingTitle from "../JamMming";
import { TrackType } from "./Types";
import {
  checkForAccessToken,
  searchSpotify,
  getAccessToken,
  getSpotifyAuthorization,
  getUserId,
  createPlaylist,
  addTracksToPlaylist,
} from "./Spotify";
import "./App.css";
import "./SearchBar/SearchBar.css";
import "../global.css";

// Define the type for the addedTracks state
type AddedTracksType = { [key: string]: boolean };

function App() {
  const [searchResults, setSearchResults] = useState<TrackType[]>([]);
  const [playlistTracks, setPlaylistTracks] = useState<TrackType[]>([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [addedTracks, setAddedTracks] = useState<AddedTracksType>({});
  const [hasSearched, setHasSearched] = useState(false);
  const [isPlaylistSaved, setIsPlaylistSaved] = useState(false);

  // Function to add a track to the playlist
  const addTrackToPlaylist = (trackToAdd: TrackType) => {
    if (!addedTracks[trackToAdd.id]) {
      setPlaylistTracks([...playlistTracks, trackToAdd]);
      setAddedTracks({ ...addedTracks, [trackToAdd.id]: true });
    }
  };

  // Function to remove a track from the playlist
  const removeTrackFromPlaylist = (trackToRemove: TrackType) => {
    setPlaylistTracks(
      playlistTracks.filter((track) => track.id !== trackToRemove.id)
    );
    setAddedTracks({ ...addedTracks, [trackToRemove.id]: false });
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
      setIsPlaylistSaved(true); // Set the state to true when the playlist is saved successfully

      // Reset the state after a delay
      setTimeout(() => {
        setIsPlaylistSaved(false);
      }, 3000);

      // Reset the existing playlist on the web app
      setPlaylistTracks([]);
      setPlaylistName("New Playlist");
      // Reset the addedTracks state
      setAddedTracks({});
      console.log("Playlist saved to Spotify!");
    } catch (error) {
      console.error("Error saving playlist:", error);
    }
  };

  // Function to handle search
  const handleSearch = async (term: string) => {
    let accessToken = getAccessToken();
    if (!accessToken) {
      console.log("Access token is not available, redirecting to login.");
      getSpotifyAuthorization();
      return;
    }

    try {
      const results = await searchSpotify(term, accessToken);
      setSearchResults(results);
      setHasSearched(true); // Update the state to indicate that a search has been performed

      // Use the AddedTracksType for the reduce function's accumulator
      const newAddedTracks = results.reduce(
        (acc: AddedTracksType, track: TrackType) => {
          acc[track.id] = !!playlistTracks.find(
            (pTrack) => pTrack.id === track.id
          );
          return acc;
        },
        {} as AddedTracksType
      ); // Initialize the accumulator with the correct type

      setAddedTracks(newAddedTracks);
    } catch (error: unknown) {
      // Change 'error' to 'error: unknown'
      if (error instanceof Error && error.message.includes("401")) {
        console.log("Access token might be expired, redirecting to login.");
        getSpotifyAuthorization();
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  // Function to reset the search
  const handleReset = () => {
    setSearchResults([]); // Clear the search results
    setHasSearched(false);
  };

  // Initialize Spotify authentication on app load
  useEffect(() => {
    checkForAccessToken();
  }, []);

  // Determine if the playlist should be at the top based on the screen size
  const isLargerScreen = window.innerWidth >= 768; // Assuming 768px as the breakpoint for md

  return (
    <div className="background-image">
      <div className="content">
        <div
          className="container center-content"
          style={{ maxWidth: "container.xl" }}
        >
          <div
            className="center"
            style={{
              flexDirection: "column",
              width: "100%",
              minHeight: "100vh",
            }}
          >
            <h1 style={{ marginBottom: "20px" }}>
              <JammmingTitle />
            </h1>
            <SearchBar
              onSearch={handleSearch}
              onReset={handleReset}
              hasSearched={hasSearched}
            />
            <div
              className="flex"
              style={{
                flexDirection: isLargerScreen ? "row" : "column",
                justifyContent: "center",
                alignItems: "start",
                padding: "55px",
              }}
            >
              {isLargerScreen && (
                <div className="box" style={{ width: "100%", padding: "16px" }}>
                  <Playlist
                    tracks={playlistTracks}
                    onRemove={removeTrackFromPlaylist}
                    onSave={savePlaylist}
                    playlistName={playlistName}
                    onNameChange={handleNameChange}
                  />
                </div>
              )}
              <div
                className="box"
                style={{
                  width: isLargerScreen ? "50%" : "100%",
                  padding: "16px",
                  marginLeft: isLargerScreen ? "10%" : "0",
                }}
              >
                <div
                  className="simple-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "20px",
                  }}
                >
                  <SearchResults
                    searchResults={searchResults}
                    onAdd={addTrackToPlaylist}
                    addedTracks={addedTracks}
                  />
                </div>
              </div>
              {!isLargerScreen && (
                <div className="box" style={{ width: "100%", padding: "16px" }}>
                  <Playlist
                    tracks={playlistTracks}
                    onRemove={removeTrackFromPlaylist}
                    onSave={savePlaylist}
                    playlistName={playlistName}
                    onNameChange={handleNameChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {isPlaylistSaved && <SavePlaylistAlert />}
      </div>
    </div>
  );
}

export default App;
