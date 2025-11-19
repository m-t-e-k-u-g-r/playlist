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

fetch('data/playlist.json')
    .then((res) => res.json())
    .then((data) => {
        Object.entries(data).forEach(([playlistName, songs]) => {

            const container = createSection(playlistName)
        })
    });