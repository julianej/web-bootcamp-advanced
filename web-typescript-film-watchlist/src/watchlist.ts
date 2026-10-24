interface Watchable {
  readonly id: number;
  title: string;
  year: number;
}

interface Film extends Watchable {
  watched: boolean;
  rating?: 1 | 2 | 3 | 4 | 5;
}

interface Playlist {
    name: string;
    films: Film[];
}

// A function formatFilm(film: Film): string 
// that returns a one-line description. Include the rating only if one is set

function formatFilm(film: Film): string {
  if (film.rating !== undefined) {
    return `${film.title} (${film.year}) — Rating: ${film.rating}/5`;
  }

  return `${film.title} (${film.year})`;
}

const anotherFilm: Film = {
  id: 2,
  title: "Dune",
  year: 2021,
  watched: false,
};

console.log(formatFilm(anotherFilm));
// Dune (2021)


// A function getUnwatched(playlist: Playlist): Film[] 
// that returns only films where watched is false

function getUnwatched(playlist: Playlist): Film[] {
  return playlist.films.filter((film) =>
     film.watched === false);
}

// create a playlst object and do console.log
// const unwatched = getUnwatched(playlist);
// console.log(unwatched);
const playlist: Playlist = {
  name: "Movie Night",
  films: [
    {
      id: 1,
      title: "Interstellar",
      year: 2014,
      watched: true,
      rating: 5,
    },
    {
      id: 2,
      title: "Dune",
      year: 2021,
      watched: false,
    },
    {
      id: 3,
      title: "Arrival",
      year: 2016,
      watched: false,
      rating: 4,
    },
  ],
};

const unwatched = getUnwatched(playlist);
console.log(unwatched);

// tsc                          
// node dist/watchlist.js