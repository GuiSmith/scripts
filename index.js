const clientId = '99111492024c4ccd84a141ba2f8277ee'; // Replace with your Spotify API client ID
const redirectUri = 'http://127.0.0.1:5500/index.html'; // Replace with your redirect URI

// Function to handle user login
function loginWithSpotify() {
    const scopes = 'user-library-read user-read-playback-state user-read-currently-playing'; // Specify required scopes
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=token`;

    // Redirect the user to the Spotify login page
    window.location.href = authUrl;
}

// Check if the user is returning from Spotify authentication
if (window.location.hash) {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');

    if (accessToken) {
        // The user is authenticated, you can now make API requests
        console.log('Logged in with access token:', accessToken);
    }
}

// Add event listener to the login button
const loginButton = document.getElementById('login-button');
if (loginButton) {
    loginButton.addEventListener('click', loginWithSpotify);
}