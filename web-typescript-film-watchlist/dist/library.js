// DEFINE AND EXPORT
export function formatFilm(film) {
    const ratingText = film.rating !== undefined ? ` — Rating: ${film.rating}/5` : "";
    return `${film.title} (${film.year})${ratingText}`;
}
export function getUnwatched(playlist) {
    return playlist.films.filter((film) => film.watched === false);
}
//# sourceMappingURL=library.js.map