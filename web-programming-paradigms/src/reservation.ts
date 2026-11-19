export type ReservationStatus =
  | "reserved"
  | "returned"
  | "cancelled";


export class BookReservation {
  // Public fields
  memberId: number;
  bookTitle: string;

  // Private status field
  #status: ReservationStatus = "reserved";

  constructor(memberId: number, bookTitle: string) {
    this.memberId = memberId;
    this.bookTitle = bookTitle;
  }

  // Getter: allows reading the status
  get status(): ReservationStatus {
    return this.#status;
  }

  // Change status to returned
  markReturned(): void {
    if (this.#status !== "reserved") {
      throw new Error(`Cannot return a book with status: ${this.#status}`);
    }

    this.#status = "returned";
  }

  // Change status to cancelled
  cancel(): void {
    if (this.#status !== "reserved") {
      throw new Error(`Cannot cancel a reservation with status: ${this.#status}`);
    }

    this.#status = "cancelled";
  }
}
