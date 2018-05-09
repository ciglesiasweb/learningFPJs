var a;
// Generation
// const isIterable = (something) =>
//   !!something[Symbol.iterator];

// const generate = (iterable) => {
//   for (let element of iterable) {
//     if (isIterable(element)) {
//       generate(element)
//     }
//     else {
//       console.log(element)
//     }
//   }
// }

// a = generate([1, [2, [3, 4], 5]])

// // vs iterators!
// const treeIterator = (iterable) => {
//     const iterators = [ iterable[Symbol.iterator]() ];

//     return () => {
//       while (!!iterators[0]) {
//         const iterationResult = iterators[0].next();

//         if (iterationResult.done) {
//           iterators.shift();
//         }
//         else if (isIterable(iterationResult.value)) {
//           iterators.unshift(iterationResult.value[Symbol.iterator]());
//         }
//         else {
//           return iterationResult.value;
//         }
//       }
//       return;
//     }
//   }

//   const i = treeIterator([1, [2, [3, 4], 5]]);
//   let n;

//   while (n = i()) {
//     console.log(n)
//   }

function* empty() { };

function* only(something) {
    yield something;
};


const ThreeNumbers = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3
    }
}


//yielding iterables