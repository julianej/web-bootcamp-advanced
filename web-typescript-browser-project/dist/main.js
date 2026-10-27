import { fetchTracks } from "./track.js";
const form = document.getElementById("search-form");
const list = document.getElementById("track-list");
if (!(form instanceof HTMLFormElement)) {
    throw new Error("Element #search-form not found");
}
if (!(list instanceof HTMLUListElement)) {
    throw new Error("Element #track-list not found");
}
const render = (results) => {
    list.replaceChildren(...results.map((track) => {
        const item = document.createElement("li");
        const button = document.createElement("button");
        button.dataset.id = String(track.id);
        button.textContent = track.liked ? "♥" : "♡";
        item.append(button, ` ${track.title} by ${track.artist}`);
        return item;
    }));
};
function readQuery(form) {
    const query = new FormData(form).get("query");
    return typeof query === "string"
        ? query.trim().toLowerCase()
        : "";
}
const tracks = await fetchTracks("track.json");
render(tracks);
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = readQuery(form);
    render(tracks.filter((track) => `${track.title} ${track.artist}`
        .toLowerCase()
        .includes(query)));
});
