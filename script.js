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
    container.classList.add('playlist');
    container.id = targetId;

    document.body.appendChild(title);
    document.body.appendChild(container);

    return container;
}

function renderPlaylist(songs, container) {
    songs.forEach(song => {
        const box = document.createElement('div');
        box.classList.add('song', 'border', 'd-flex', 'align-items-start', 'gap-3');

        const img = document.createElement('img');
        img.classList.add('covers', 'border', 'p-1');
        img.src = '.assets/images/' + song.image;

        const textBox = document.createElement('div');
        textBox.classList.add('flex-grow-1');

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

function createNav(name) {
    const id = (slugify(name)) + '-h2';
    const nav = document.getElementById('nav-links');
    const link = document.createElement('a');
    link.href = "#" + id;
    link.textContent = name;
    nav.appendChild(link);
}

const navLinks = document.getElementById('nav-links');
const burger = document.getElementById('menuToggle');
burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
})

const scrollBtn = document.getElementById('scrollBtn');
scrollBtn.addEventListener("click", topFunction);
scrollBtn.classList.add('btn', 'btn-dark');
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
}

function topFunction() {

}

fetch('data/playlist.json')
    .then((res) => res.json())
    .then((data) => {
        Object.entries(data).forEach(([playlistName, songs]) => {
            const valid = Array.isArray(songs)
                ? songs.filter(s => s && s.title)
                : [];

            const container = createSection(playlistName)

            createNav(playlistName);

            renderPlaylist(valid, container);
        })
    });