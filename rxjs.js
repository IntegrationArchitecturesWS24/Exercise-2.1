import { Subject } from 'rxjs';

// 1. Create a Subject (acts as both an Observable and an Observer)
const publisher = new Subject();

// 2. Create Subscriber (ConcreteSubscriber)
const subscriber1 = {
    next: (data) => console.log("Subscriber 1 received:", data),
    complete: () => console.log("Subscriber 1 completed"),
};

const subscriber2 = {
    next: (data) => console.log("Subscriber 2 received:", data),
    complete: () => console.log("Subscriber 2 completed"),
};

// 3. Subscribe method
publisher.subscribe(subscriber1);
publisher.subscribe(subscriber2);

// Publish method
publisher.next("First dynamic update");
publisher.next("Second dynamic update");

publisher.complete();

