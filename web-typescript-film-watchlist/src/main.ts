
import {
  type Film,
  type Playlist,
  formatFilm,
  getUnwatched,
} from "./library.js";

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

    console.log(`Playlist: ${playlist.name}`);

// The entry point should define a playlist with at least three films 
// and log the output of both functions

// formatFilm(film: Film): string
    console.log("All films:");

for (const film of playlist.films) {
    console.log(formatFilm(film));
}

// getUnwatched(playlist: Playlist): Film[]
    console.log("\nUnwatched films:");

const unwatched: Film[] = getUnwatched(playlist);

for (const film of unwatched) {
    console.log(formatFilm(film));
}



// npx tsc
// node dist/main.js