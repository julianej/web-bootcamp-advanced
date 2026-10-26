import type { LibraryTrack, TrackCreatePayload, TrackPreview, TrackUpdatePayload } from "./types.js";
export declare function addTrack(payload: TrackCreatePayload): LibraryTrack;
export declare function updateTrack(id: number, changes: TrackUpdatePayload): LibraryTrack | undefined;
export declare function toPreview(track: LibraryTrack): TrackPreview;
//# sourceMappingURL=library.d.ts.map