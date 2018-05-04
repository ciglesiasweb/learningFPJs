// const isIterable = (something) =>
//     !!something[Symbol.iterator];

// const TreeIterable = (iterable) =>
//     ({
//         [Symbol.iterator]: function* () {
//             for (const e of iterable) {
//                 if (isIterable(e)) {
//                     for (const ee of TreeIterable(e)) {
//                         yield ee;
//                     }
//                 }
//                 else {
//                     yield e;
//                 }
//             }
//         }
//     })

// for (const i of TreeIterable([1, [2, [3, 4], 5]])) {
//     console.log(i);
// }
// function* tree(iterable) {
//     for (const e of iterable) {
//         if (isIterable(e)) {
//             for (const ee of tree(e)) {
//                 yield ee;
//             }
//         }
//         else {
//             yield e;
//         }
//     }
// };

// function * tree (iterable) { //with the abbreviation
//     for (const e of iterable) {
//       if (isIterable(e)) {
//         yield * tree(e);
//       }
//       else {
//         yield e;
//       }
//     }
//   };
// for (const i of tree([1, [2, [3, 4], 5]])) {
//     console.log(i);
// }

// function* append(...iterables) {
//     for (const iterable of iterables) {
//         for (const element of iterable) {
//             yield element;
//         }
//     }
// }

// function * append (...iterables) { //es el mismo que el anterior usando la abreviación yield *
//     for (const iterable of iterables) {
//       yield * iterable;
//     }
//   }

const lyrics = append(["a", "b", "c"], ["one", "two", "three"], ["do", "re", "me"]);

for (const word of lyrics) {
    console.log(word);
}