# Readme Project

## Usage Notes
1. Image retrieval is performed via an API.
2. This requires a client ID and client secret, which cannot be provided via the `.env` file directly.
3. To display the images, a client ID and client secret must be created via **Spotify for Developers**.

### API Quick Guide
1. Open `https://developer.spotify.com`
2. Create an account / log in
3. Open the `Dashboard` -> `Create app`
4. Follow the instructions
5. Add the client ID and client secret to the `.env` file in the `backend` directory as `CLIENT_ID` and `CLIENT_SECRET`