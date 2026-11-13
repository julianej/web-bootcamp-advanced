type BookRow = {
  id: number;
  title: string;
  author_name: string; // Snake Case
  is_available: 0 | 1; // UNION TYPE, SQLite-style boolean (0 = false, 1 = true).
  added_at: number;
};

const bookRows: BookRow[] = [
  {
    id: 1,
    title: "Dune",
    author_name: "Frank Herbert",
    is_available: 1,
    added_at: 1730937600,
  },
  {
    id: 2,
    title: "Piranesi",
    author_name: "Susanna Clarke",
    is_available: 1,
    added_at: 1731196800,
  },
  {
    id: 3,
    title: "Kindred",
    author_name: "Octavia E. Butler",
    is_available: 0,
    added_at: 1731024000,
  },
  {
    id: 4,
    title: "Neuromancer",
    author_name: "William Gibson",
    is_available: 0,
    added_at: 1731283200,
  },
  {
    id: 5,
    title: "The Left Hand of Darkness",
    author_name: "Ursula K. Le Guin",
    is_available: 1,
    added_at: 1731110400,
  },
];

export type BookResponse = {
  id: number;
  title: string;
  authorName: string; // Camel Case
  addedAt: string;
};

// ---------------------------------------------------------
// Convert database row into API response

// addedAt: string; "2024-11-07T00:00:00.000Z"
// const date = new Date(book.addedAt);
// addedAt: row.added_at,

function toBookResponse(row: BookRow): BookResponse {
  return {
    id: row.id,
    title: row.title,
    authorName: row.author_name,
    addedAt: new Date(row.added_at * 1000).toISOString(),
  };
}

console.log("BOOK-ROWS", toBookResponse(bookRows[0]));

// ---------------------------------------------------------
// Filter available books and convert them
function getAvailableBooks(rows: BookRow[]): BookResponse[] {
  return rows
    .filter((row) => row.is_available === 1)
    .map((row) => toBookResponse(row));
}

console.log("BOOK-AVAILABLE",getAvailableBooks(bookRows));


// ---------------------------------------------------------
// Sort newest first without mutating the original array
// sortNewestFirst(rows) 
// returns the rows sorted by added_at, 

// newest first. The array you pass in keeps its order.
// descending order: largest timestamp (newest) first.


// .toSorted() → creates a sorted copy.
// function sortNewestFirst(rows: BookRow[]): BookResponse[] {
//     return rows
//      .toSorted((a, b) => b.added_at - a.added_at);
// }

// .sort() → mutates the original array.
function sortNewestFirst(rows: BookRow[]): BookRow[] {
  return [...rows].sort((a, b) => b.added_at - a.added_at);
}

console.log("BOOK-NEWEST",sortNewestFirst(bookRows));
console.log(bookRows); // Original array remains unchanged

// Log with: npx tsx catalogue.ts