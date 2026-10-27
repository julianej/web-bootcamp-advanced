
// src/tracks.ts
export interface Track {
  id: number;
  title: string;
  artist: string;
  liked: boolean;
}

export async function fetchTracks(url: string): Promise<Track[]> {
  const response = await fetch(url);
  const data = await response.json();
// data as Track[] asserts the parsed JSON as the expected shape
  return data as Track[];
}
