// App.tsx
import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "./SearchResults/SearchResults";
import Playlist from "./Playlist/Playlist";
import { TrackType } from "./Types";
import { checkForAccessToken } from "./Spotify";

function App() {
  // State to store search results
  const [searchResults, setSearchResults] = useState<TrackType[]>([
    {
      id: "1",
      title: "Bad Guy",
      artist: "Billie Eilish",
      album: "When We All Fall Asleep, Where Do We Go?",
      albumImageUrl: "https://i.scdn.co/image/ab67616d0000b273",
      uri: "spotify:track:2Fxmhks0bxGSBdJ92vM42m",
    },
    {
      id: "2",
      title: "Sunflower",
      artist: "Post Malone, Swae Lee",
      album: "Spider-Man: Into the Spider-Verse",
      albumImageUrl: "https://i.scdn.co/image/ab67616d0000b273",
      uri: "spotify:track:3KkXRkHbMCARz0aVfEt68P",
    },
    {
      id: "3",
      title: "Lose Yourself",
      artist: "Eminem",
      album: "8 Mile",
      albumImageUrl: "https://i.scdn.co/image/ab67616d0000b273",
      uri: "spotify:track:5Z01UMMf7V1o0MzF86s6WJ",
    },
  ]);

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

  // Function to simulate saving a playlist to Spotify with actual URIs from playlistTracks
  const savePlaylist = () => {
    const trackUris = playlistTracks.map((track) => track.uri);
    console.log("Saving playlist to Spotify...");
    console.log(`Playlist Name: ${playlistName}`);
    console.log(`Track URIs: ${trackUris}`);

    // Reset the existing playlist on the web app
    setPlaylistTracks([]);
    setPlaylistName("New Playlist");
  };

  // Function to handle the actual save action (to be connected later)
  const handleSavePlaylist = () => {
    savePlaylist();
  };

  // Function to handle search (to be replaced with Spotify API call)
  const handleSearch = (term: string) => {
    // Placeholder functionality for filtering hardcoded search results
    const filteredResults = searchResults.filter((track) =>
      track.title.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  // Initialize Spotify authentication on app load
  useEffect(() => {
    checkForAccessToken();
  }, []);

  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResults searchResults={searchResults} onAdd={addTrackToPlaylist} />
      <Playlist
        tracks={playlistTracks}
        onRemove={removeTrackFromPlaylist}
        onSave={handleSavePlaylist}
        playlistName={playlistName}
        onNameChange={handleNameChange}
      />
    </div>
  );
}

export default App;
