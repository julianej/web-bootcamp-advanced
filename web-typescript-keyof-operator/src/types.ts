// src/track.ts
export interface Media {
  id: number;
  title: string;
}

export interface Track extends Media {
  artist: string;
  liked: boolean;
}

export interface FeaturedTrack extends Track {
  curatedBy: string;
  readonly addedDate: string;
}

// src/types.ts
export interface FormatLabels {
  vinyl: string;
  cd: string;
  digital: string;
  cassette: string;
}

export type Format = keyof FormatLabels;
// type Format = "vinyl" | "cd" | "digital";


// ACCEPTS these values
// const format1: Format = "vinyl";    // ✅
// const format2: Format = "cd";       // ✅
// const format3: Format = "digital";  // ✅

// const format4: Format = "cassette"; // ❌ Error


///////////////////////  26.10
// Part 2: add a generic response Wrapper
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// Part 3: Utility types
export interface LibraryTrack extends Track {
  addedAt: Date;
  playCount: number;
}

// Omit means “take a type and leave out specific properties.
export type TrackCreatePayload = Omit<
  LibraryTrack,
  "id" | "addedAt" | "playCount"
>;
export type TrackUpdatePayload = Partial<TrackCreatePayload>;
export type TrackPreview = Pick<LibraryTrack, "id" | "title" | "artist">;

