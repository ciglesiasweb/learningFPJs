// linear recursion
// Dividing a problem into subproblems, detecting terminal cases, 
// solving the terminal cases, 
// and composing a solution from the solved portions.

// const flatten = ([first, ...rest]) => {
//     if (first === undefined) {
//         return [];
//     }
//     else if (!Array.isArray(first)) {
//         return [first, ...flatten(rest)];
//     }
//     else {
//         return [...flatten(first), ...flatten(rest)];
//     }
// }

// const a = flatten(["foo", [3, 4, []]])

//maping with recursion

// const squareAll = ([first, ...rest]) => first === undefined
//     ? []
//     : [first * first, ...squareAll(rest) ];

// const a2 = squareAll([1, 2, 3, 4, 5])

// const mapWith = (fn, [first, ...rest]) =>
//   first === undefined
//     ? []
//     : [fn(first), ...mapWith(fn, rest)];

// mapWith((x) => x * x, [1, 2, 3, 4, 5])
//   //=> [1,4,9,16,25]

// mapWith((x) => !!x, [null, true, 25, false, "foo"])

//folding with recursion
// const foldWith = (fn, terminalValue, [first, ...rest]) =>
//   first === undefined
//     ? terminalValue
//     : fn(first, foldWith(fn, terminalValue, rest));

// const a2 = foldWith((number, rest) => number * number + rest, 0, [1, 2, 3, 4, 5])

// console.log("a")

// // a map is a specializacion of a fold:

// const mapWith = (fn, array) => foldWith((first, rest) => [fn(first), ...rest], [], array)


// Tail Calls (and Default Arguments)
// tail-call optimization, or “TCO.”

// NO TCO
const length_NO_TCO = ([first, ...rest]) =>
    first === undefined
        ? 0
        : 1 + length(rest);


// TCO
const lengthDelaysWork = ([first, ...rest], numberToBeAdded) =>
    first === undefined
        ? numberToBeAdded
        : lengthDelaysWork(rest, 1 + numberToBeAdded)

const length = (n) => lengthDelaysWork(n, 0);

// OR PARTIAL APPLICATION:
// const callLast = (fn, ...args) =>
//     (...remainingArgs) =>
//       fn(...remainingArgs, ...args);

// const length = callLast(lengthDelaysWork, 0);

// const mapWithDelaysWork = (fn, [first, ...rest], prepend) =>
//   first === undefined
//     ? prepend
//     : mapWithDelaysWork(fn, rest, [...prepend, fn(first)]);

// const mapWith = callLast(mapWithDelaysWork, []);

// mapWith((x) => x * x, [1, 2, 3, 4, 5])



const factorialWithDelayedWork = (n, work) =>
  n === 1
  ? work
  : factorialWithDelayedWork(n - 1, n * work);

// const factorial = (n) =>
//   factorialWithDelayedWork(n, 1);

const a2 = factorial(3);


const callLast = (fn, ...args) =>
    (...remainingArgs) =>
      fn(...remainingArgs, ...args);

const factorialX = callLast(factorialWithDelayedWork, 1);

const factorial = (n, work = 1) =>
  n === 1
  ? work
  : factorial(n - 1, n * work);

console.log('ddddddddddd')