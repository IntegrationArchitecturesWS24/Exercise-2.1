# Exercise3
In the 
## Object Creation
In JavaScript you create objects like this:
``` javascript
const Person = {
  name: 'Max Mustermann',
  alter: 31,
  ledig: true
}
```

## Functions and Callback Handler
A callback is a function that is passed to another function and called by that function. Often in JavaScript functions are called when another function is not finished. Callback functions ensure that the functions are called in the defined order. The "Pyramid of Doom" occurs due to nested callbacks, which create complex and hard-to-read code.
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
Promises provide a better way to handle asynchronous code. They avoid the issue of nested callbacks.

![Example from Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png)
```javascript
function example() {
  return new Promise((resolve, reject) => {
    resolve("Promise resolved");
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
We see that the function example is called before the promise is resolved. The await statement waits for the promise to be resolved before continuing with the code of the function. The synchronous code is executed before the asynchronous code.


Asynchrony:It allows a program to initiate tasks without waiting for their completion, enabling the execution of other tasks simultaneously.
Parallelism: It refers to the simultaneous execution of multiple tasks or processes, typically using multiple processors or cores.
Concurrency(OR Multithreading): It refers to a program's ability to handle multiple tasks at the same time, which may not be executed simultaneously but can progress independently.

Quellen:..............





## Todo:
- Object Creation (i.e.: how can objects be instantiated in JavaScript?) ✅
- Functions and Callback Handler (including the term “Pyramid of Doom”) ✅
- Promise (including error handling) ✅
- The await/async statement ✅
- Providing a simple REST-based interface (GET and POST) with the Express.js
package (framework). More details for this item can be found in assignment 1 b. 🚧
- Using the package Axios for consuming a REST-based interface. (Remark: here,
you are asked for implementing examples for consuming the interface of
OrangeHRM and OpenCRX (use the SEPP installations, only)). ✅
- Handling cookies in Express.js (i.e.: creation, reading and deletion). ✅
- A module for implementing the calculation of the bonus salary of a salesman. ✅
- A simple implementation of the Observer Pattern ([GoF]) using the framework
RxJS. ✅
- Please provide solid definitions (including references!) to the following terms:
Asynchrony, Parallelism, and Concurrency (or: Multithreading) 🚧