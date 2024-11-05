import { Subject } from "rxjs";

// Create a Subject (acts as both an Observable and an Observer)
const publisher = new Subject();

// Create subscribers
const subscriber1 = {
  next: (data) => console.log("Subscriber 1 received:", data),
  complete: () => console.log("Subscriber 1 completed"),
};

const subscriber2 = {
  next: (data) => console.log("Subscriber 2 received:", data),
  complete: () => console.log("Subscriber 2 completed"),
};

// Subscribe to the Subject
publisher.subscribe(subscriber1);
publisher.subscribe(subscriber2);

// Publish data
publisher.next("First dynamic update");
publisher.next("Second dynamic update");

publisher.complete();
