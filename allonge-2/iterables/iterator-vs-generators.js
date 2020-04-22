// Generation
// const isIterable = (something) =>
//     !!something[Symbol.iterator];
// const generate = (iterable) => {
//     for (let element of iterable) {
//         if (isIterable(element)) {
//             generate(element)
//         } else {
//             console.log(element)
//         }
//     }
// }
// generate([1, [2, [3, 4], 5]])

// Iteration
const isIterable = (something) =>
    !!something[Symbol.iterator];
const treeIterator = (iterable) => {
    const iterators = [iterable[Symbol.iterator]()];
    return () => {
        while (!!iterators[0]) {
            const iterationResult = iterators[0].next();
            if (iterationResult.done) {
                iterators.shift();
            } else if (isIterable(iterationResult.value)) {
                iterators.unshift(iterationResult.value[Symbol.iterator]());
            } else {
                return iterationResult.value;
            }
        }
        return;
    }
}
const i = treeIterator([1, [2, [3, 4], 5]]);
let n;
while (n = i()) {
    console.log(n)
}