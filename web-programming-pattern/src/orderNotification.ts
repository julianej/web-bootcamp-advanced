// Acceptance criteria


// When an order is paid, the warehouse logs a reservation message

// When an order is shipped, a simulated email is logged

// A new reaction to state changes can be added without changing the Order class
// Technical requirements


// Order lets listeners subscribe and notifies all of them after every transition, 
// with the old and the new state (Observer)

// Done when
// Running one order from Draft to Delivered logs the reservation once and the email once.

// Hint
// Define a listener type like (from: OrderState, to: OrderState) => void, 
// and call every listener at the end of transition(), after the state has changed.

export {};

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

const transitions: Record<OrderState, Partial<Record<OrderEvent, OrderState>>> = {
  Draft: { checkout: "AwaitingPayment", cancel: "Cancelled" },
  AwaitingPayment: { payment_received: "Paid", cancel: "Cancelled" },
  Paid: { dispatch: "Shipped", cancel: "Cancelled" },
  Shipped: { confirm_delivery: "Delivered" },
  Delivered: {},
  Cancelled: {},
};

// A listener is just a function.
type OrderListener = (from: OrderState, to: OrderState) => void;

class Order {
  private _state: OrderState = "Draft";
  private readonly listeners: OrderListener[] = [];

  get state(): OrderState {
    return this._state;
  }

  // Returns a function that removes the listener again.
  subscribe(listener: OrderListener): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index !== -1) this.listeners.splice(index, 1);
    };
  }

  transition(event: OrderEvent): void {
    const next = transitions[this._state][event];
    if (next === undefined) {
      throw new Error(
        `Event "${event}" is not allowed in state "${this._state}"`
      );
    }
    const from = this._state;
    this._state = next;
    // At the end, after the state has changed.
    for (const listener of this.listeners) {
      listener(from, next);
    }
  }
}

// Reactions: Order knows nothing about them.
const warehouse: OrderListener = (_from, to) => {
  if (to === "Paid") {
    console.log("Warehouse: items reserved for the order");
  }
};

const customerEmail: OrderListener = (_from, to) => {
  if (to === "Shipped") {
    console.log("Email: your order has been shipped");
  }
};

// Demo
const order = new Order();
order.subscribe(warehouse);
order.subscribe(customerEmail);

for (const event of [
  "checkout",
  "payment_received",
  "dispatch",
  "confirm_delivery",
] as const) {
  order.transition(event);
  console.log(`${event} -> ${order.state}`);
}

// npx tsx src/orderNotifications.ts

// What changed compared to the earlier version:

// Function type instead of interface: OrderListener is (from, to) => void. 
// A new reaction is just a function passed to subscribe, with no class needed.
// transition() instead of handle(): this matches the name in the hint. 
// If your own Order class from the lifecycle ticket already uses transition(), 
// you only need to add listeners, subscribe, and the loop at the end.
// Unsubscribe: subscribe returns a function that removes the listener. 
// This is optional, but it is a common part of the Observer pattern.