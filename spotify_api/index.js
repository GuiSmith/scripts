const clientId = '99111492024c4ccd84a141ba2f8277ee'; // Replace with your Spotify API client ID
const redirectUri = 'https://guismith.github.io/projects/spotify_api/main/index.html'; // Replace with your redirect URI
//Test redirect: http://localhost/projects/spotify_api/main/index.html

var accessToken;

// Function to handle user login
function loginWithSpotify() {
    const scopes = 'user-library-read user-read-playback-state user-read-currently-playing user-read-recently-played'; // Specify required scopes
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=token`;

    // Redirect the user to the Spotify login page
    window.location.href = authUrl;
}

// Check if the user is returning from Spotify authentication
if (window.location.hash) {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    accessToken = hashParams.get('access_token');

    if (accessToken) {
        // The user is authenticated, you can now make API requests
        //console.log('Logged in with access token:', accessToken);
        //Storing access token
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 60 * 60 * 1000);
        const cookieString = `accessToken=${accessToken}; expires=${expirationTime.toUTCString()}; path=/`;
        document.cookie = cookieString;
    }
}

// Add event listener to the login button
const loginButton = document.getElementById('login-button');
if (loginButton) {
    loginButton.addEventListener('click', loginWithSpotify);
}

//Getting access token from cookie
function getAccessToken() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'accessToken') {
        return value;
        }
    }
    return null; // Access token not found in cookies
}
//Delete access token
function deleteAccessToken(){
    const pastDate = new Date(0);
    document.cookie = 'accessToken=; expires=' + pastDate.toUTCString() + '; path=/';
}

async function getSpotify(request, requestMethod, id = 1, limit = 0){
    var link = "https://api.spotify.com/v1/";
    switch (request){
        case "user":
            link += "me";
            break;
        case "recently-played":
            link += "me/player/recently-played";
            break;
        case "currently-playing":
            link += "me/player/currently-playing";
            break;
        case "track":
            link += `tracks/${id}`;
            break;
        default:
            console.log("Request not specified");
            return;
    }
    if(limit != 0){
        link += `?limit=${limit}`;
    }
    try {
        const response = await fetch(link, {
            method: requestMethod,
            headers: {  
                Authorization: `Bearer ${getAccessToken()}`,
            }
        });
        if(response.status != 200){
            console.error(response);
        }else{
            const data = await response.json();
            console.log(`${request} processed`);
            return data;
        }
    } catch(error){
        console.error(error);
    }
}

