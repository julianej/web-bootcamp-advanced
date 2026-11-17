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