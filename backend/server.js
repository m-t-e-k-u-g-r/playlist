const express = require('express');
const NodeCache = require('node-cache');
const app = express();
const cors = require('cors')
const tokenURL = "https://accounts.spotify.com/api/token";
const songURL = "https://api.spotify.com/v1/tracks/";
const tokenCache = new NodeCache( { stdTTL: 3599} );

app.use(cors({
    origins: [
        'http://127.0.0.1:3000',
        'http://localhost:3000'
    ],
    methods: 'GET'
}))
app.get('/api/track/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ error: 'Missing Track id' });
        const token = tokenCache.get("token");
        if (!token) {
            let token = await getSpotifyToken();
        }
        const spotifyResponse = await fetch(songURL + id, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await spotifyResponse.json();
        res.json(data.album.images[0].url);
    } catch (error) {

    }
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
    tokenCache.set("token", data.access_token);
    return;
}

app.listen(process.env.PORT || 3003)