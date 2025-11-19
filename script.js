function slugify(name) {
    return String(name)
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '');
}

function createSection(name) {
    const targetId = (slugify(name));

    const title = document.createElement('h2');
    title.id = targetId + '-h2';
    title.innerText = name;

    const container = document.createElement('section');
    container.id = targetId;

    document.body.appendChild(title);
    document.body.appendChild(container);

    return container;
}

function renderPlaylist(songs, container) {
    songs.forEach(song => {
        const box = document.createElement('div');

        const img = document.createElement('img');
        img.src = '.assets/images/' + song.image;

        const textBox = document.createElement('div');

        const title = document.createElement('h3');
        title.innerText = song.title;

        const artist = document.createElement('p');
        artist.innerText = song.artist;

        textBox.appendChild(title);
        textBox.appendChild(artist);
        box.appendChild(img);
        box.appendChild(textBox);
        container.appendChild(box);
    })
}

fetch('data/playlist.json')
    .then((res) => res.json())
    .then((data) => {
        Object.entries(data).forEach(([playlistName, songs]) => {
            const valid = Array.isArray(songs)
                ? songs.filter(s => s && s.title)
                : [];

            const container = createSection(playlistName)

            renderPlaylist(valid, container);
        })
    });