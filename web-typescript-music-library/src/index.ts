
// AUFGABE 02 - Alias declaration
type TrackId = number;
type ArtistName = string;

// type Track = {
//   id: TrackId;
//   title: string;
//   artist: ArtistName;
//   liked: boolean;
// };


// AUFGABE 06 extend (delete Alias type Track)
interface Media {
  id: number;
  title: string;
}

interface Track extends Media {
  artist: string;
  liked: boolean;
}

interface FeaturedTrack extends Track {
  curatedBy: string;
  readonly addedDate: string;
}

function describeTrack(track: Track): string {
  return `${track.title} by ${track.artist}`;
}


const tracks: Track[] = [
  { id: 1, title: "Blue Light", artist: "Jorja Smith", liked: true },
  { id: 2, title: "Nights", artist: "Frank Ocean", liked: false },
];

console.log(describeTrack(tracks[0]))

// ERROR console.log(describeTrack(tracks[0])
// if (tracks[0] !== undefined) {
//   console.log(describeTrack(tracks[0]));
// }

// AUFGABE 03
type Format = "vinyl" | "cd" | "digital";
type TrackLength = number | string;

function describeFormat(format: Format): string {
  return `Available on ${format}`;
}

function formatLength(length: TrackLength): string {
  if (typeof length === "number") {
    const minutes = Math.floor(length / 60);
    const seconds = length % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }
  return length;
}

console.log(describeFormat("vinyl"));
console.log(formatLength(245));
console.log(formatLength("3:12"));


// AUFGABE 04 - // type TrackLength = number | string;
// const rawLength: unknown = JSON.parse("198"); 
// console.log(formatLength(rawLength));

const rawLength: unknown = JSON.parse("198");

// wrap the call to make it work:
if (
  typeof rawLength === "number" ||
  typeof rawLength === "string"
) {
  console.log(formatLength(rawLength));
}


// AUFGABE 05 - TypeScript inferred
const label = "My Library";
const trackCount = tracks.length; // number

function formatId(id: number): string {
  return `TRK-${id}`;
}

const ids = tracks.map((t) => formatId(t.id));
console.log(ids, label, trackCount);

// ADD it, and check while hovering and see: trackCount is inferred as a number
// const count: string = trackCount; 
const count: string = String(trackCount);


// AUFGABE 7 readonly properties in TypeScript.
const pick: FeaturedTrack = {
  id: 3,
  title: "Golden",
  artist: "Jill Scott",
  liked: true,
  curatedBy: "editorial",
  addedDate: "2024-01-15", // readonly
};

console.log(`${pick.title} — featured since ${pick.addedDate}`);

// AUFGABE 08 - types and tuples
type HasRating = {
  rating: 1 | 2 | 3 | 4 | 5;
};

type RatedTrack = Track & HasRating;

const review: RatedTrack = {
  id: 4,
  title: "Ivy",
  artist: "Frank Ocean",
  liked: true,
  rating: 5,
};

console.log(`${review.title}: ${review.rating}/5`);


// AUFGABE 09
type ChartEntry = [number, string];

const chart: ChartEntry[] = [
  [1, "Nights"],
  [2, "Blue Light"],
];

for (const [position, title] of chart) {
  console.log(`#${position} ${title}`);
}