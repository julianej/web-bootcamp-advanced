"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function describeTrack(track) {
    return `${track.title} by ${track.artist}`;
}
const tracks = [
    { id: 1, title: "Blue Light", artist: "Jorja Smith", liked: true },
    { id: 2, title: "Nights", artist: "Frank Ocean", liked: false },
];
console.log(describeTrack(tracks[0]));
function describeFormat(format) {
    return `Available on ${format}`;
}
function formatLength(length) {
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
const rawLength = JSON.parse("198");
// wrap the call to make it work:
if (typeof rawLength === "number" ||
    typeof rawLength === "string") {
    console.log(formatLength(rawLength));
}
// AUFGABE 05 - TypeScript inferred
const label = "My Library";
const trackCount = tracks.length; // number
function formatId(id) {
    return `TRK-${id}`;
}
const ids = tracks.map((t) => formatId(t.id));
console.log(ids, label, trackCount);
// ADD it, and check while hovering and see: trackCount is inferred as a number
// const count: string = trackCount; 
const count = String(trackCount);
// AUFGABE 7 readonly properties in TypeScript.
const pick = {
    id: 3,
    title: "Golden",
    artist: "Jill Scott",
    liked: true,
    curatedBy: "editorial",
    addedDate: "2024-01-15", // readonly
};
console.log(`${pick.title} — featured since ${pick.addedDate}`);
const review = {
    id: 4,
    title: "Ivy",
    artist: "Frank Ocean",
    liked: true,
    rating: 6,
};
console.log(`${review.title}: ${review.rating}/6`);
//# sourceMappingURL=index.js.map