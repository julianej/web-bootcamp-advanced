// Define a Book interface for one entry 
// and a SearchResult interface for the whole response. Look closely at the types of id and total.
export interface Book {
  id: string;
  title: string;
  subtitle: string;
  authors: string;
  image: string;
  url: string;
}

export interface SearchResult {
  status: string;
  total: string;
  books: Book[];
}

// {
//   "docs": [
//     {
//       "id": "OL12345W",
//       "title": "The Hobbit",
//       "author": "J. R. R. Tolkien"
//     }
//   ],
//   "total": 1
// }
