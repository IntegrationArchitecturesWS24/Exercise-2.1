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

function fetchData(callback) {
  setTimeout(() => {
    console.log("Data fetched");
    callback();
  }, 1000);
}

fetchData(() => {
  console.log("Processing data");
  fetchData(() => {
    console.log("Saving data");
    fetchData(() => {
      console.log("Data saved");
    });
  });
});

```
## Promises:
Promises provide a better way to handle asynchronous code. They avoid the issue of nested callbacks.

![Example from Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png)
```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("Data fetched successfully");
      } else {
        reject("Error fetching data");
      }
    }, 1000);
  });
}

fetchData()
  .then(data => {
    console.log(data);
    return "Processing data";
  })
  .then(processedData => {
    console.log(processedData);
  })
  .catch(error => {
    console.error(error);
  });

```






## Todo:
- Object Creation (i.e.: how can objects be instantiated in JavaScript?) ✅
- Functions and Callback Handler (including the term “Pyramid of Doom”) 
- Promise (including error handling)
- The await/async statement
- Providing a simple REST-based interface (GET and POST) with the Express.js
package (framework). More details for this item can be found in assignment 1 b.
- Using the package Axios for consuming a REST-based interface. (Remark: here,
you are asked for implementing examples for consuming the interface of
OrangeHRM and OpenCRX (use the SEPP installations, only)).
- Handling cookies in Express.js (i.e.: creation, reading and deletion).
- A module for implementing the calculation of the bonus salary of a salesman.
- A simple implementation of the Observer Pattern ([GoF]) using the framework
RxJS.
- Please provide solid definitions (including references!) to the following terms:
Asynchrony, Parallelism, and Concurrency (or: Multithreading)