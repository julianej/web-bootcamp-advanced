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
//# sourceMappingURL=index.js.map