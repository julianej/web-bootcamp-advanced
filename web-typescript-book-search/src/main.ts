
import { fetchBooks } from "./books.js";
import type { Book } from "./types.js";

const form = document.getElementById("search-form");
const list = document.getElementById("track-list");

if (!(form instanceof HTMLFormElement)) {
  throw new Error("Element #search-form not found");
}

if (!(list instanceof HTMLUListElement)) {
  throw new Error("Element #track-list not found");
}

const render = (books: Book[]): void => {
  list.replaceChildren(
    ...books.map((book) => {
      const item = document.createElement("li");
      const link = document.createElement("a");

      link.href = book.url;
      link.textContent = `${book.title} by ${book.authors}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      item.append(link);
      return item;
    }),
  );
};

function readQuery(form: HTMLFormElement): string {
  const query = new FormData(form).get("query");

  return typeof query === "string" ? query.trim() : "";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = readQuery(form);

  if (!query) {
    list.replaceChildren();
    return;
  }

  try {
    const books = await fetchBooks(query);
    render(books);
  } catch (error) {
    console.error("Could not search books:", error);
    list.replaceChildren();

    const item = document.createElement("li");
    item.textContent = "Could not load books. Please try again.";
    list.append(item);
  }
});
