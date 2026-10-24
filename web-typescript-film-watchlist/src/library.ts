
// DEFINE AND EXPORT

export interface Watchable {
  readonly id: number;
  title: string;
  year: number;
}

export interface Film extends Watchable {
  watched: boolean;
  rating?: 1 | 2 | 3 | 4 | 5;
}

export interface Playlist {
  name: string;
  films: Film[];
}

export function formatFilm(film: Film): string {
    
  const ratingText = 
  film.rating !== undefined ? ` — Rating: ${film.rating}/5` : "";

  return `${film.title} (${film.year})${ratingText}`;
}

export function getUnwatched(playlist: Playlist): Film[] {
  return playlist.films.filter((film) => film.watched === false);
}
