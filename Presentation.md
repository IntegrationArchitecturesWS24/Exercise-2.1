---
theme: gaia
marp: true
---
<!--
class: lead
-->
# Exercise 2.1

Integration Architectures
Team 12

---
<!--
class: default
-->
# Quick Summary

- Familiarize with JS
- Use RxJS for the Observer Pattern
- Write a module for the bonus calculation
- Write a REST API in Express.JS and implement the interface of assignment 1.2
- Use cookies with Express.JS
- Use Axios to interact with OpenCRX and OrangeHRM
- Test with Postman
---
# Object Creation
In JavaScript you create objects like this [1]:
``` javascript
const max = {
  name: 'Max Mustermann',
  age: 31,
  married: true
}
```
---
# Object Creation
But, you can also provide prototypes for objects:
``` javascript
function Person(name, age, married) {
  this.name = name;
  this.age = age;
  this.married = married;
}
```
And then create an object from the prototype like this:
``` javascript
const max = new Person('Max Mustermann', 31, true);
```
---
# Functions
A function in JavaScript is a block of code that can be called by name. Functions can take parameters and return values. Functions can be defined using the `function` keyword or as arrow functions [2]:
``` javascript
function add(a, b) {
  return a + b;
}
const add = (a, b) => a + b;
```
---
# Callback
A callback is a function that is passed to another function and called by that function. Often in JavaScript functions are called when another function is not finished. Callback functions ensure that the functions are called in the defined order [3].

---
# Pyramid of Doom

The "Pyramid of Doom" occurs due to nested callbacks, which create complex and hard-to-read code.

---
# Pyramid of Doom
``` javascript
function pyramid(callback) {
  setTimeout(() => {
    console.log("Calling pyramid function after 1 second");
    callback();
  }, 1000);
}
pyramid(() => {
  console.log("First Callback");
  pyramid(() => {
    console.log("Second Callback");
    pyramid(() => {
      console.log("Third Callback");
    });
  });
});
```
---
# Promises
Promises provide a better way to handle asynchronous code. They avoid the issue of nested callbacks.

![Example from Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png)

---
# Promises
```javascript
function example() {
  return new Promise((resolve, reject) => {
    resolve("Promise resolved");
  });
}
example()
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
console.log(1);
console.log(2);
console.log(3);
```
---
# Promises

The output will be:
```
1
2
3
Promise resolved
```
We see that the promise is resolved after the other console.log statements. This is because the promise is asynchronous and will be executed after the synchronous code.

---
# The await/async statement
The await statement is used in an async function to wait for a promise to be resolved. The async function returns a promise that will be resolved with the value returned by the async function. The await statement can only be used inside an async function. [5]

---
# The await/async statement

```javascript	
async function example() {
  console.log("Awaiting waitExample");
  const data = await waitExample();
  console.log(data);
}
async function waitExample() {
  return "Promise resolved";
}
console.log("Before example");
example();
console.log("After example");
```

---
# The await/async statement
The output will be:
```
Before example
Awaiting waitExample
After example
Promise resolved
```

We see that the function `example` is called before the promise is resolved. The await statement waits for the promise to be resolved before continuing with the code of the function. The synchronous code is executed before the asynchronous code.

---
# RxJS
"RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array methods (map, filter, reduce, every, etc) to allow handling asynchronous events as collections."[6]

---
# RxJS
- `Observable`: represents the idea of an invokable collection of future values or events.
- `Observer`: is a collection of callbacks that knows how to listen to values delivered by the Observable.
- `Subject`: is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.

---
# RxJS
```javascript
import { Subject } from "rxjs";
// Create a Subject
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
/* .... */
```
---
# RxJS

```javascript
// Subscribe to the Subject
publisher.subscribe(subscriber1);
publisher.subscribe(subscriber2);

// Publish data
publisher.next("First dynamic update");
publisher.next("Second dynamic update");

publisher.complete();
```

---
# RxJS
The output will be:
```
Subscriber 1 received: First dynamic update
Subscriber 2 received: First dynamic update
Subscriber 1 received: Second dynamic update
Subscriber 2 received: Second dynamic update
Subscriber 1 completed
Subscriber 2 completed
```
We see that both subscribers receive the data published by the Subject. The Subject is used to multicast the data to multiple subscribers.

---
# REST API

We have created a REST API using Express.js. The application uses `Express.Router` to define routes and `Express.json` to parse JSON data. [7]

---
# REST API Endpoints
First we provided a simple Hello World endpoint:
- **GET /**
  - Description: Returns a simple Hello World message.
  - Responses:
    - `200 OK`: Returns the message "Hello World!".

---
# REST API Endpoints
Endpoints for the bonus calculation:
- **GET /bonus/**
  - Description: Calculate bonus for a company.
  - Responses:
    - `200 OK`: Returns the calculated bonus.
    - `500 Internal Server Error`: Error calculating bonus.

---
# REST API Endpoints
Endpoints for the cookie handling:
- **GET /cookies/**
  - Description: Get or set a cookie.
  - Responses:
    - `200 OK`: Returns the cookie if it exists.
    - `200 OK`: Sets a cookie if it does not exist.

---
# REST API Endpoints
- **GET /cookies/delete**
  - Description: Delete a cookie.
  - Responses:
    - `200 OK`: Cookie deleted successfully.

---
# REST API Endpoints
Endpoints for fetching data from openhrm:
- **GET /orangehrm/**
  - Description: Fetch data from OrangeHRM.
  - Responses:
    - `200 OK`: Returns the fetched data.
    - `500 Internal Server Error`: Error fetching data.

Implementation review afterwards.

---
# REST API Endpoints
Endpoints for fetching data from opencrx:
- **GET /opencrx/**
  - Description: Fetch data from OpenCRX.
  - Responses:
    - `200 OK`: Returns the fetched data.
    - `500 Internal Server Error`: Error fetching data.

Implementation review afterwards.

---
# REST API Endpoints
We also implemented the endpoints for the assignment 1.2:
- **Post /salesman**: Create a new salesman.
- **GET /salesman/sid**: Get a salesman by ID.
- **GET /salesman**: Get all salesmen.
- **PUT /salesman**: Update a salesman.
- **DELETE /salesman/sid**: Delete a salesman.
---
# REST API Endpoints
The endpoints for the social records of a salesman:
- **POST /salesman/:sid/record**: Create a new record for a salesman.
- **GET /salesman/:sid/record/rid**: Get all records of a salesman.
- **DELETE /salesman/:sid/record/gid**: Delete a record of a salesman.

---
# Asynchrony
"Asynchrony, in computer programming, refers to the occurrence of events independent of the main program flow and ways to deal with such events. These may be "outside" events such as the arrival of signals, or actions instigated by a program that take place concurrently with program execution, without the program hanging to wait for results." [8]

---
# Parallelism
"Parallel computing is a type of computation in which many calculations or processes are carried out simultaneously. Large problems can often be divided into smaller ones, which can then be solved at the same time." [9]

---
# Concurrency (OR Multithreading)
"In computer science, concurrency is the ability of different parts or units of a program, algorithm, or problem to be executed out-of-order or in partial order, without affecting the outcome. This allows for parallel execution of the concurrent units, which can significantly improve overall speed of the execution in multi-processor and multi-core systems." [10]

---
# References
1. https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics

2. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions

3. https://developer.mozilla.org/en-US/docs/Glossary/Callback_function

4. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

---
# References

5. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

6. https://rxjs.dev/guide/overview

7. https://expressjs.com/en/5x/api.html

8. https://en.wikipedia.org/wiki/Asynchrony_(computer_programming)

---
# References

9. https://en.wikipedia.org/wiki/Parallel_computing

10. https://en.wikipedia.org/wiki/Concurrency_(computer_science)
