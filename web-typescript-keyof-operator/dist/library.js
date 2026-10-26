// src/library.ts
// Create src/library.ts. It plays the role of the server: 
// it keeps the tracks in an array and sets the fields that a client must not send.
import { findById } from "./api.js";
const library = [];
export function addTrack(payload) {
    const track = {
        ...payload,
        id: library.length + 1,
        addedAt: new Date(),
        playCount: 0,
    };
    library.push(track);
    return track;
}
export function updateTrack(id, changes) {
    const track = findById(library, id);
    if (track) {
        Object.assign(track, changes);
    }
    return track;
}
export function toPreview(track) {
    return { id: track.id, title: track.title, artist: track.artist };
}
//# sourceMappingURL=library.js.map