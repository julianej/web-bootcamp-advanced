// A literal union type 
// TicketTier with the values "standing", "seated", and "vip"
type TicketTier = "standing" | "seated" | "vip";


// const myTicket: TicketTier = "vip";       // ✅ Valid
// const anotherTicket: TicketTier = "seated"; // ✅ Valid
// const invalidTicket: TicketTier = "balcony"; // ❌ TypeScript error


// A tuple type Seat 
// that holds a row letter (string) and a seat number (number)
type Seat = [string, number];

// A Ticket interface 
// with a readonly id, a tier, and an optional seat
interface Ticket {
  readonly id: number;
  tier: TicketTier;
  seat?: Seat;
}

// A VipTicket type that combines Ticket with { loungeAccess: boolean } 
// using an intersection &

type VipTicket = Ticket & {
  loungeAccess: boolean;
};


// A function ticketPrice(tier: TicketTier): 
// number that returns a different price for each tier
function ticketPrice(tier: TicketTier): number {
  switch (tier) {
    case "standing":
      return 40;
    case "seated":
      return 75;
    case "vip":
      return 150;
  }
}

console.log(ticketPrice("standing")); // 40
console.log(ticketPrice("seated"));   // 75
console.log(ticketPrice("vip"));      // 150

// A function describeSeat(seat: Seat): 
// string that returns a text like "Row C, seat 12"
// type Seat = [string, number];
function describeSeat(seat: Seat): string {
// destructuring:
  const [row, seatNumber] = seat;
  return `Row ${row}, seat ${seatNumber}`;
}

console.log(describeSeat(["C", 12]));
// "Row C, seat 12"


// A function parseQuantity(input: unknown): 
// number that returns the input if it is a number and 0 otherwise

function parseQuantity(input: unknown): number {
// input: unknown means the function can receive a value of any type, 
// but you must check its type before using it as a number.
  if (typeof input === "number") {
    return input;
  }

  return 0;
}

console.log(parseQuantity(25));      // 25
console.log(parseQuantity("25"));    // 0
console.log(parseQuantity(undefined)); // 0


// Create at least one ticket of each tier, 
const tickets: Ticket[] = [
  {
    id: 1,
    tier: "standing",
  },
  {
    id: 2,
    tier: "seated",
    seat: ["C", 12],
  },
  {
    id: 3,
    tier: "vip",
    seat: ["A", 1],
  },
];

// log their prices, and log the seat description for every ticket that has a seat
for (const ticket of tickets) {
  console.log(
    `Ticket ${ticket.id} (${ticket.tier}): €${ticketPrice(ticket.tier)}`
  );

  if (ticket.seat !== undefined) {
    console.log(describeSeat(ticket.seat));
  }
}

// Call parseQuantity with a number, 
// a string, and JSON.parse("3"), and log the results

console.log(parseQuantity(5));             // 5
console.log(parseQuantity("5"));           // 0
console.log(parseQuantity(JSON.parse("3"))); // 3
