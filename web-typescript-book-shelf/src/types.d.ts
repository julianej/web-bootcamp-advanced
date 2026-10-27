export type EntityId = number | string;
export type Timestamped = {
    createdAt: Date;
    updatedAt: Date;
};
export type HasId = {
    id: EntityId;
};
export type Book = HasId & Timestamped & {
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
//# sourceMappingURL=types.d.ts.map