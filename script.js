function slugify(name) {
    return String(name)
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '');
}

fetch('data/playlist.json')
    .then((res) => res.json())
    .then((data) => {
        
    });