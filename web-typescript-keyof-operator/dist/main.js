// src/main.ts
import { formatId } from "./track.js";
import { readFileSync } from "node:fs";
import { addTrack, updateTrack, toPreview } from "./library.js";
const libraryName = "Late Night Listening";
function describeTrack(title, artist) {
    return `${title} by ${artist}`;
}
const tracks = [
    { id: 1, title: "Blue Light", artist: "Jorja Smith", liked: true },
    { id: 2, title: "Nights", artist: "Frank Ocean", liked: false },
];
// check if track exist tracks[0]
const firstTrack = tracks[0];
if (firstTrack) {
    console.log(describeTrack(firstTrack.title, firstTrack.artist));
}
const pick = {
    id: 3,
    title: "Golden",
    artist: "Jill Scott",
    liked: true,
    curatedBy: "editorial",
    addedDate: "2024-01-15",
};
console.log(`Library: ${libraryName}`);
// check if track exist tracks[0]
console.log(describeTrack(tracks[0].title, tracks[0].artist));
tracks.forEach((t) => console.log(formatId(t.id)));
console.log(`Featured: ${pick.title}, added ${pick.addedDate}`);
const notes = readFileSync("notes.txt", "utf8");
console.log(notes);
///////////////////////  26.10
import { describeFormat } from "./track.js";
console.log(describeFormat("vinyl"));
// print your tracks as a small table
const columns = ["title", "artist", "liked"];
for (const track of tracks) {
    console.log(columns.map((column) => track[column]).join(" | "));
}
///////////////////////
import { ok, findById } from "./api.js";
const allTracks = ok(tracks);
const featured = ok(pick);
console.log(`${allTracks.data.length} tracks, 
  featured: ${featured.data.title}, 
  picked by ${featured.data.curatedBy}`);
///////////////////////
// search for findById
console.log(findById(tracks, 2)?.title);
// findById(["Blue Light", "Nights"], 1); ERROR
///////////////////////
// add, like, preview a Track
const ivy = addTrack({ title: "Ivy", artist: "Frank Ocean", liked: false });
updateTrack(ivy.id, { liked: true });
console.log(toPreview(ivy), ivy.liked);
//# sourceMappingURL=main.js.map