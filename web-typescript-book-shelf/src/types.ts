
export type EntityId = number | string;

export type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

export type HasId = {
  id: EntityId;
};

export type Book = HasId &
  Timestamped & {
    title: string;
    author: string;
    isbn: string;
    isAvailable: boolean;
  };

export type IsbnParts = [
  group: number,
  publisher: string,
  titleIdentifier: string
];

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// This tuple describes three elements:
// export type IsbnParts = [
//   group: number,
//   publisher: string,
//   titleIdentifier: string
// ];

// const valid: IsbnParts = [978, "3", "16"];

// Error: first element must be a number
// const invalid: IsbnParts = ["978", "3", "16"];

// Error: missing the third element
// const incomplete: IsbnParts = [978, "3"];