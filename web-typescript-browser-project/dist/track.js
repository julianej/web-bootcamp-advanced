export async function fetchTracks(url) {
    const response = await fetch(url);
    const data = await response.json();
    // data as Track[] asserts the parsed JSON as the expected shape
    return data;
}
