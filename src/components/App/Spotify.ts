// Spotify.ts

const clientId = '5815332195d34b3fa381be4204872791';
const redirectUri = 'http://localhost:5173/'; 
const scopes = [
  'playlist-modify-public',
  'playlist-modify-private',
  // Add other scopes as needed
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

    // Store the access token and expiration time in localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expiresIn', expiresIn.toString());

    // Clear the parameters from the URL
    window.setTimeout(() => (window.location.hash = ''), expiresIn * 1000);
    window.history.pushState('Access Token', null as any, '/');
    return accessToken;
  }

  // Check localStorage for an existing access token
  const storedAccessToken = localStorage.getItem('accessToken');
  if (storedAccessToken) {
    return storedAccessToken;
  }

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

// Add more functions below to handle Spotify API requests

