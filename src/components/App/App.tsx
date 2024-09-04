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
import backgroundImage from "./assets/Images/IMG_5317.jpeg"; // Import the image

type AddedTracksType = { [key: string]: boolean };

function App() {
  const [searchResults, setSearchResults] = useState<TrackType[]>([]);
  const [playlistTracks, setPlaylistTracks] = useState<TrackType[]>([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [addedTracks, setAddedTracks] = useState<AddedTracksType>({});
  const [hasSearched, setHasSearched] = useState(false);
  const [isPlaylistSaved, setIsPlaylistSaved] = useState(false);

  const addTrackToPlaylist = (trackToAdd: TrackType) => {
    if (!addedTracks[trackToAdd.id]) {
      setPlaylistTracks([...playlistTracks, trackToAdd]);
      setAddedTracks({ ...addedTracks, [trackToAdd.id]: true });
    }
  };

  const removeTrackFromPlaylist = (trackToRemove: TrackType) => {
    setPlaylistTracks(
      playlistTracks.filter((track) => track.id !== trackToRemove.id)
    );
    setAddedTracks({ ...addedTracks, [trackToRemove.id]: false });
  };

  const handleNameChange = (name: string) => {
    setPlaylistName(name);
  };

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
      setIsPlaylistSaved(true);

      setTimeout(() => {
        setIsPlaylistSaved(false);
      }, 3000);

      setPlaylistTracks([]);
      setPlaylistName("New Playlist");
      setAddedTracks({});
      console.log("Playlist saved to Spotify!");
    } catch (error) {
      console.error("Error saving playlist:", error);
    }
  };

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
      setHasSearched(true);

      const newAddedTracks = results.reduce(
        (acc: AddedTracksType, track: TrackType) => {
          acc[track.id] = !!playlistTracks.find(
            (pTrack) => pTrack.id === track.id
          );
          return acc;
        },
        {} as AddedTracksType
      );

      setAddedTracks(newAddedTracks);
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("401")) {
        console.log("Access token might be expired, redirecting to login.");
        getSpotifyAuthorization();
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const handleReset = () => {
    setSearchResults([]);
    setHasSearched(false); // Reset this to show the playlist again
  };

  useEffect(() => {
    checkForAccessToken();
  }, []);

  const isLargerScreen = window.innerWidth >= 768;

  return (
    <div className="app-container">
      {/* Add background image */}
      <img
        src={backgroundImage}
        alt="Background"
        className="background-image"
      />

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
            <JammmingTitle />
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
              {!hasSearched && (
                <div
                  className="playlist-container"
                  style={{
                    width: "100%",
                    padding: "16px",
                    marginBottom: isLargerScreen ? "0" : "20px",
                  }}
                >
                  <Playlist
                    tracks={playlistTracks}
                    onRemove={removeTrackFromPlaylist}
                    onSave={savePlaylist}
                    playlistName={playlistName}
                    onNameChange={handleNameChange}
                  />
                </div>
              )}

              {hasSearched && (
                <div
                  className="search-results-container"
                  style={{
                    width: isLargerScreen ? "50%" : "100%",
                    padding: "16px",
                    marginLeft: isLargerScreen ? "10%" : "0",
                  }}
                >
                  <SearchResults
                    searchResults={searchResults}
                    onAdd={addTrackToPlaylist}
                    addedTracks={addedTracks}
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
