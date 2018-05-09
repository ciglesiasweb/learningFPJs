var a;
// const iterableSum = (iterable) => {
//     let sum = 0;

//     for (const num of iterable) {
//         sum += num;
//     }
//     return sum
// }


// const EMPTY = {
//     isEmpty: () => true
// };

// const isEmpty = (node) => node === EMPTY;

// const Pair1 = (first, rest = EMPTY) =>
//     ({
//         first,
//         rest,
//         isEmpty() { return false },
//         [Symbol.iterator]() {
//             let currentPair = this;

//             return {
//                 next() {
//                     if (currentPair.isEmpty()) {
//                         return { done: true }
//                     }
//                     else {
//                         const value = currentPair.first;

//                         currentPair = currentPair.rest;
//                         return { done: false, value }
//                     }
//                 }
//             }
//         }
//     });

// const list = (...elements) => {
//     const [first, ...rest] = elements;

//     return elements.length === 0
//         ? EMPTY
//         : Pair1(first, list(...rest))
// }

// const someSquares = list(1, 4, 9, 16, 25);

// a = iterableSum(someSquares)
// a = ['some squares', ...someSquares]


const Numbers = {
    [Symbol.iterator]() {
        let n = 0;

        return {
            next: () =>
                ({ done: false, value: n++ })
        }
    }
}


const mapWith = (fn, collection) =>
    ({
        [Symbol.iterator]() {
            const iterator = collection[Symbol.iterator]();

            return {
                next() {
                    const { done, value } = iterator.next();

                    return ({ done, value: done ? undefined : fn(value) });
                }
            }
        }
    });


const filterWith = (fn, iterable) =>
    ({
        [Symbol.iterator]() {
            const iterator = iterable[Symbol.iterator]();

            return {
                next() {
                    let done, value
                    do {
                        ({ done, value } = iterator.next());
                    } while (!done && !fn(value));
                    return { done, value };
                }
            }
        }
    });

const untilWith = (fn, iterable) =>
    ({
        [Symbol.iterator]() {
            const iterator = iterable[Symbol.iterator]();

            return {
                next() {
                    let { done, value } = iterator.next();

                    done = done || fn(value);

                    return ({ done, value: done ? undefined : value });
                }
            }
        }
    });

const first = (iterable) =>
    iterable[Symbol.iterator]().next().value;

const rest = (iterable) =>
    ({
        [Symbol.iterator]() {
            const iterator = iterable[Symbol.iterator]();

            iterator.next();
            return iterator;
        }
    });

// var arrTo10 = Array.from(new Array(10), (_, i)=> i);
// const iterTo10 =  arrTo10[Symbol.iterator]();

const iterTo10 = Array.from(new Array(100), (_, i) => i)[Symbol.iterator]();

// const evensTo10 = filterWith((e) => e % 2, iterTo10)

const lessThan10 = untilWith((e) => e > 10, Numbers)
const evensLessThan10 = filterWith((e) => e % 2, lessThan10)
// for (const i of evensLessThan10) {
//     console.log(i)
// }
// console.log([...evensLessThan10])
a = Array.from(evensLessThan10)
console.log('done')
console.log(a)