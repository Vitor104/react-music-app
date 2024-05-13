let accessToken = "";
const client_id = "4c5767b1d0604c9bbdfc92c223c1d6a2";
const redirectUrl = "https://reactmusicappjam.netlify.app";

const Spotify = {
    getAccessToken () {
        if (accessToken) {
            return accessToken;
        }

        const tokenInURL =  window.location.href.match(/access_token=([^&]*)/);
        const expiryTime =  window.location.href.match(/expires_in=([^&]*)/);

        if (tokenInURL && expiryTime) {
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1]);

           window.setTimeout(() => (accessToken = ""), expiresIn * 1000);  
            
            window.history.pushState("Access token", null, "/");
            return accessToken;
        } else { 
        const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
        window.location = redirect;
        }
    },
    
     search(term) {
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: "GET",
            headers: {'Authorization': `Bearer ${accessToken}`},
        })    
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map((tracks) => ({
                id: tracks.id,
                name: tracks.name,
                artist: tracks.artists[0].name,
                album: tracks.album.name,
                uri: tracks.uri,
            }))
        })
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris) {
            return;
        }
        let aToken = Spotify.getAccessToken();
        const header = {'Authorization': `Bearer ${aToken}`};
        return fetch(`https://api.spotify.com/v1/me`, {
            headers: header,
        })
        .then((response) => response.json())       
        .then((jsonResponse) => {
            let userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: header,
                method: "POST",
                body: JSON.stringify({name: name}),
            })
            .then((response) => response.json())           
            .then((jsonResponse) => {
                let playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: header,
                    method: "POST",
                    body: JSON.stringify({uris: trackUris}),
                });
            });
        });
    },
};


export default Spotify;


