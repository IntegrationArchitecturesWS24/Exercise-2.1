# Exercise3
In this exercise, we will learn about JavaScript, the Observer Pattern, and the REST API. We will also discuss asynchrony, parallelism, and concurrency.

## Object Creation
In JavaScript you create objects like this [1]:
``` javascript
const Person = {
  name: 'Max Mustermann',
  age: 31,
  married: true
}
```
You can also provide prototypes for objects:
``` javascript
function Person(name, age, married) {
  this.name = name;
  this.age = age;
  this.married = married;
}
```
You can create an object from the prototype like this:
``` javascript
const max = new Person('Max Mustermann', 31, true);
```
## Functions and Callback Handler
A function in JavaScript is a block of code that can be called by name. Functions can take parameters and return values. Functions can be defined using the `function` keyword or as arrow functions [2]:
``` javascript
function add(a, b) {
  return a + b;
}
const add = (a, b) => a + b;
```

A callback is a function that is passed to another function and called by that function. Often in JavaScript functions are called when another function is not finished. Callback functions ensure that the functions are called in the defined order. The "Pyramid of Doom" occurs due to nested callbacks, which create complex and hard-to-read code. [3]
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

## Promises:
Promises provide a better way to handle asynchronous code. They avoid the issue of nested callbacks. [4]
![Example from Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png)
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
The output will be:
```
1
2
3
Promise resolved
```
We see that the promise is resolved after the other console.log statements. This is because the promise is asynchronous and will be executed after the synchronous code.

## The await/async statement
The await statement is used in an async function to wait for a promise to be resolved. The async function returns a promise that will be resolved with the value returned by the async function. The await statement can only be used inside an async function. [5]
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
The output will be:
```
Before example
Awaiting waitExample
After example
Promise resolved
```

We see that the function `example` is called before the promise is resolved. The await statement waits for the promise to be resolved before continuing with the code of the function. The synchronous code is executed before the asynchronous code.

## RxJS
"RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array methods (map, filter, reduce, every, etc) to allow handling asynchronous events as collections."[6]

The essential concepts in RxJS which we need for the Observer Pattern are:
- `Observable`: represents the idea of an invokable collection of future values or events.
- `Observer`: is a collection of callbacks that knows how to listen to values delivered by the Observable.
- `Subscription`: represents the execution of an Observable, is primarily useful for cancelling the execution.
- `Subject`: is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.

Let's see an example of the Observer Pattern using RxJS:
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

// Subscribe to the Subject
publisher.subscribe(subscriber1);
publisher.subscribe(subscriber2);

// Publish data
publisher.next("First dynamic update");
publisher.next("Second dynamic update");

publisher.complete();
```
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

## REST API
We have created a REST API using Express.js. The application uses `Express.Router` to define routes and `Express.json` to parse JSON data. [7]

First we provided a simple Hello World endpoint:
- **GET /**
  - Description: Returns a simple Hello World message.
  - Responses:
    - `200 OK`: Returns the message "Hello World!".

Then we created a CRUD API for calculating bonuses, the Axios requests and managing salesmen:

### Salesman Routes

- **POST /salesman/**
  - Description: Create a new salesman.
  - Request Body:
    ```json
    {
      "sid": "number",
      "firstname": "string",
      "lastname": "string"
    }
    ```
  - Responses:
    - `201 Created`: Salesman created successfully.
    - `400 Bad Request`: Salesman already exists.
    - `500 Internal Server Error`: Failed creating salesman.

- **GET /salesman/:sid**
  - Description: Get a salesman by ID.
  - Parameters:
    - `sid`: Salesman ID (number)
  - Responses:
    - `200 OK`: Returns the salesman data.
      ```json
      {
        "sid": "number",
        "firstname": "string",
        "lastname": "string",
        "gids": ["number"]
      }
      ```
    - `404 Not Found`: Salesman not found.
    - `500 Internal Server Error`: Failed reading salesman.

- **GET /salesman/**
  - Description: Get all salesmen.
  - Responses:
    - `200 OK`: Returns a list of all salesmen.
      ```json
      [
        {
          "sid": "number",
          "firstname": "string",
          "lastname": "string",
          "gids": ["number"]
        }
      ]
      ```
    - `500 Internal Server Error`: Failed reading all salesmen.

- **PUT /salesman/**
  - Description: Update a salesman.
  - Request Body:
    ```json
    {
      "sid": "number",
      "firstname": "string",
      "lastname": "string",
      "gids": ["number"]
    }
    ```
  - Responses:
    - `202 Accepted`: Salesman updated successfully.
    - `404 Not Found`: Salesman not found.
    - `500 Internal Server Error`: Error updating salesman.

- **DELETE /salesman/:sid**
  - Description: Delete a salesman by ID.
  - Parameters:
    - `sid`: Salesman ID (number)
  - Responses:
    - `202 Accepted`: Salesman deleted successfully.
    - `404 Not Found`: Salesman not found.
    - `500 Internal Server Error`: Failed deleting salesman.

- **POST /salesman/:sid/record**
  - Description: Add a social performance record to a salesman.
  - Parameters:
    - `sid`: Salesman ID (number)
  - Request Body:
    ```json
    {
      "gid": "number",
      "description": "string",
      "targetValue": "number",
      "actValue": "number",
      "year": "number"
    }
    ```
  - Responses:
    - `201 Created`: Record added successfully.
    - `400 Bad Request`: Record already exists.
    - `404 Not Found`: Salesman not found.
    - `500 Internal Server Error`: Failed creating record.

- **GET /salesman/:sid/record**
  - Description: Get all social performance records of a salesman.
  - Parameters:
    - `sid`: Salesman ID (number)
  - Responses:
    - `200 OK`: Returns a list of records.
      ```json
      [
        {
          "gid": "number",
          "description": "string",
          "targetValue": "number",
          "actValue": "number",
          "year": "number"
        }
      ]
      ```
    - `404 Not Found`: Salesman not found.
    - `500 Internal Server Error`: Failed reading records.

- **DELETE /salesman/:sid/record/:gid**
  - Description: Delete a social performance record from a salesman.
  - Parameters:
    - `sid`: Salesman ID (number)
    - `gid`: Record ID (number)
  - Responses:
    - `202 Accepted`: Record deleted successfully.
    - `404 Not Found`: Salesman not found.
    - `500 Internal Server Error`: Failed deleting record.

### Bonus Routes

- **GET /bonus/bonus**
  - Description: Calculate bonus for a company.
  - Request Body:
    ```json
    {
      "company": {
        "name": "string",
        "rating": "string"
      },
      "items": "number"
    }
    ```
  - Responses:
    - `200 OK`: Returns the calculated bonus.
      ```json
      {
        "company": {
          "name": "string",
          "rating": "string"
        },
        "bonus": "number"
      }
      ```
    - `500 Internal Server Error`: Error calculating bonus.

### Cookies Routes

- **GET /cookies/**
  - Description: Get or set a cookie.
  - Responses:
    - `200 OK`: Returns the cookie if it exists.
      ```json
      {
        "content": "string"
      }
      ```
    - `200 OK`: Sets a cookie if it does not exist.

- **GET /cookies/delete**
  - Description: Delete a cookie.
  - Responses:
    - `200 OK`: Cookie deleted successfully.

### OpenHRM Routes

- **GET /openhrm/**
  - Description: Fetch data from OpenHRM.
  - Responses:
    - `200 OK`: Returns the fetched data.
      ```json
      {
        // OpenHRM data structure
      }
      ```
    - `500 Internal Server Error`: Error fetching data.

### OpenCRX Routes

- **GET /opencrx/**
  - Description: Fetch data from OpenCRX.
  - Responses:
    - `200 OK`: Returns the fetched data.
      ```json
      {
        // OpenCRX data structure
      }
      ```
    - `500 Internal Server Error`: Error fetching data.

## Asynchrony, Parallelism, and Concurrency (or: Multithreading)
**Asynchrony**: "Asynchrony, in computer programming, refers to the occurrence of events independent of the main program flow and ways to deal with such events. These may be "outside" events such as the arrival of signals, or actions instigated by a program that take place concurrently with program execution, without the program hanging to wait for results." [8]

**Parallelism**: "Parallel computing is a type of computation in which many calculations or processes are carried out simultaneously. Large problems can often be divided into smaller ones, which can then be solved at the same time." [9]

**Concurrency(OR Multithreading)**: "In computer science, concurrency is the ability of different parts or units of a program, algorithm, or problem to be executed out-of-order or in partial order, without affecting the outcome. This allows for parallel execution of the concurrent units, which can significantly improve overall speed of the execution in multi-processor and multi-core systems." [10]

## References
[1] https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics

[2] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions

[3] https://developer.mozilla.org/en-US/docs/Glossary/Callback_function

[4] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

[5] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

[6] https://rxjs.dev/guide/overview

[7] https://expressjs.com/en/5x/api.html

[8] https://en.wikipedia.org/wiki/Asynchrony_(computer_programming)

[9] https://en.wikipedia.org/wiki/Parallel_computing

[10] https://en.wikipedia.org/wiki/Concurrency_(computer_science)

