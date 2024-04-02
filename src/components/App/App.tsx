import { useState } from "react";
import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "./SearchResults/SearchResults";
import Playlist from "./Playlist/Playlist";
import { TrackType } from "./Types";

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

  // Function to add a track to the playlist
  const addTrackToPlaylist = (trackToAdd: TrackType) => {
    if (playlistTracks.find((track) => track.id === trackToAdd.id)) {
      return;
    }
    setPlaylistTracks((previousTracks) => [...previousTracks, trackToAdd]);
  };

  return (
    <div className="App">
      <SearchBar /> {/* Render the SearchBar component */}
      <h1>JamMming</h1>
      <SearchResults searchResults={searchResults} onAdd={addTrackToPlaylist} />
      <Playlist tracks={playlistTracks} />
    </div>
  );
}

export default App;
