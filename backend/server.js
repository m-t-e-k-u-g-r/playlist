const express = require('express');
const app = express();
const cors = require('cors')
const tokenURL = "https://accounts.spotify.com/api/token";
const songURL = "https://api.spotify.com/v1/tracks/";

app.use(cors({
    origin: 'http://127.0.0.1:3000',
    methods: 'GET'
}))
app.get('/api/track/:id', async (req, res) => {
    const id = req.params.id;
    const token = await getSpotifyToken();
    const spotifyResponse = await fetch(songURL + id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await spotifyResponse.json();
    res.json(data.album.images[0].url);
});

async function getSpotifyToken() {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", process.env.CLIENT_ID);
    params.append("client_secret", process.env.CLIENT_SECRET);
    
    const res = await fetch(tokenURL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    });

    const data = await res.json();
    const token = data.access_token;
    return token;
}

app.listen(process.env.PORT)