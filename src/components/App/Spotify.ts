
const clientId = '5815332195d34b3fa381be4204872791'; 
const redirectUri = 'https://jammmingx.netlify.app/'; 
const scopes = [
  'playlist-modify-public',
  'playlist-modify-private',
  
];

// Redirect to Spotify's Authorization Page
export const getSpotifyAuthorization = () => {
  const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=token&show_dialog=true`;
  window.location.href = url;
};

// Extract the Access Token from the URL
export const getAccessToken = () => {
  const accessTokenMatch = window.location.hash.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.hash.match(/expires_in=([^&]*)/);

  if (accessTokenMatch && expiresInMatch) {
    const accessToken = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);
    const expirationTime = new Date().getTime() + expiresIn * 1000;

    // Store the access token and expiration time in localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expirationTime', expirationTime.toString());

    // Clear the parameters from the URL
    window.setTimeout(() => (window.location.hash = ''), expiresIn * 1000);
    window.history.pushState('Access Token', null as any, '/');
    return accessToken;
  }

  // Check localStorage for an existing access token and its expiration time
  const storedAccessToken = localStorage.getItem('accessToken');
  const storedExpirationTime = localStorage.getItem('expirationTime');

  if (storedAccessToken && storedExpirationTime) {
    const currentTime = new Date().getTime();
    if (currentTime < Number(storedExpirationTime)) {
      return storedAccessToken;
    }
  }

  // If the access token is expired or not available, clear the localStorage and re-authenticate
  localStorage.removeItem('accessToken');
  localStorage.removeItem('expirationTime');
  getSpotifyAuthorization();
  return null;
};

// Handle Errors and Check for Access Token
export const checkForAccessToken = () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    getSpotifyAuthorization();
  } else {
    // Access token is available, you can now make requests to the Spotify API
  }
};

// Search Spotify for a term
export const searchSpotify = async (searchTerm: string, accessToken: string) => {
  if (!searchTerm.trim()) {
    console.error('Search term is empty');
    return [];
  }

  const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(searchTerm)}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(endpoint, { headers });
    if (!response.ok) {
      throw new Error(`Spotify search failed, status code: ${response.status}`);
    }
    const jsonResponse = await response.json();
    // Convert the JSON response to an array of track objects
    const tracks = jsonResponse.tracks.items.map((track: any) => ({
        id: track.id,
        title: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        albumImageUrl: track.album.images[0].url,
        uri: track.uri
    }));
    return tracks;
  } catch (error) {
    console.error('Error during Spotify search:', error);
    return [];
  }
};

// Function to get the user's Spotify ID
export const getUserId = async (accessToken: string) => {
  const endpoint = 'https://api.spotify.com/v1/me';
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(endpoint, { headers });
    if (!response.ok) {
      throw new Error('Failed to get user ID');
    }
    const jsonResponse = await response.json();
    return jsonResponse.id;
  } catch (error) {
    console.error('Error getting user ID:', error);
  }
};

// Function to create a new playlist
export const createPlaylist = async (userId: string, playlistName: string, accessToken: string) => {
  const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({
    name: playlistName,
    description: 'New playlist created with Jammming',
    public: false,
  });

  try {
    const response = await fetch(endpoint, { method: 'POST', headers, body });
    if (!response.ok) {
      throw new Error('Failed to create playlist');
    }
    const jsonResponse = await response.json();
    return jsonResponse.id; // The new playlist ID
  } catch (error) {
    console.error('Error creating playlist:', error);
  }
};

// Function to add tracks to the new playlist
export const addTracksToPlaylist = async (playlistId: string, trackUris: string[], accessToken: string) => {
  const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({
    uris: trackUris,
  });

  try {
    const response = await fetch(endpoint, { method: 'POST', headers, body });
    if (!response.ok) {
      throw new Error('Failed to add tracks to playlist');
    }
    const jsonResponse = await response.json();
    return jsonResponse.snapshot_id; // Confirmation of the tracks added
  } catch (error) {
    console.error('Error adding tracks to playlist:', error);
  }
};


