// Order Lifecycle
// Acceptance criteria

// A new order starts in the state Draft
// The order allows exactly these transitions:
// checkout: Draft → AwaitingPayment
// payment_received: AwaitingPayment → Paid
// dispatch: Paid → Shipped
// confirm_delivery: Shipped → Delivered
// cancel: Draft, AwaitingPayment, or Paid → Cancelled
// Any other event throws an error that names the event and the current state

// Technical requirements

// The state is a single field with a union type, not several booleans
// All legal transitions are listed in one transition table

// Done whenA script runs one order from Draft to Delivered, cancels a second order after payment,
//  and catches the error when it tries to dispatch an unpaid order.

// Step by step
// Log Exporter Refactoring
// The log exporter below works, but it is hard to test and hard to extend. 
// It opens its own database connection, so every test needs a database. 
// And every new output format means another branch in the same method. 
// In terms of design principles, it breaks the Single Responsibility Principle 
// and the Open/Closed Principle. The ops team wants more formats soon, and tests should run without a database.


export {}; // makes this file a module, so names don't clash with other files

type OrderState =
  | "Draft"
  | "AwaitingPayment"
  | "Paid"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

type OrderEvent =
  | "checkout"
  | "payment_received"
  | "dispatch"
  | "confirm_delivery"
  | "cancel";

// All legal transitions in one place. Missing entry = illegal.
const transitions: Record<OrderState, Partial<Record<OrderEvent, OrderState>>> = {
  Draft: { checkout: "AwaitingPayment", cancel: "Cancelled" },
  AwaitingPayment: { payment_received: "Paid", cancel: "Cancelled" },
  Paid: { dispatch: "Shipped", cancel: "Cancelled" },
  Shipped: { confirm_delivery: "Delivered" },
  Delivered: {},
  Cancelled: {},
};

class Order {
  private _state: OrderState = "Draft";

  get state(): OrderState {
    return this._state;
  }

  handle(event: OrderEvent): void {
    const next = transitions[this._state][event];
    if (next === undefined) {
      throw new Error(
        `Event "${event}" is not allowed in state "${this._state}"`
      );
    }
    this._state = next;
  }
}

// Demo
const order1 = new Order();
console.log("Order 1 starts:", order1.state);
for (const event of [
  "checkout",
  "payment_received",
  "dispatch",
  "confirm_delivery",
] as const) {
  order1.handle(event);
  console.log(`  ${event} -> ${order1.state}`);
}

const order2 = new Order();
order2.handle("checkout");
order2.handle("payment_received");
order2.handle("cancel");
console.log("Order 2 after cancel:", order2.state);

const order3 = new Order();
order3.handle("checkout");
try {
  order3.handle("dispatch"); // not paid yet
} catch (error) {
  console.log((error as Error).message);
}