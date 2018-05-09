const extend = function (consumer, ...providers) {
    for (let i = 0; i < providers.length; ++i) {
        const provider = providers[i];
        for (let key in provider) {
            if (provider.hasOwnProperty(key)) {
                consumer[key] = provider[key]
            }
        }
    }
    return consumer
};

const LazyCollection = {
    map(fn) {
        return Object.assign({
            [Symbol.iterator]: () => {
                const iterator = this[Symbol.iterator]();

                return {
                    next: () => {
                        const {
                            done, value
                        } = iterator.next();

                        return ({
                            done, value: done ? undefined : fn(value)
                        });
                    }
                }
            }
        }, LazyCollection);
    },

    reduce(fn, seed) {
        const iterator = this[Symbol.iterator]();
        let iterationResult,
            accumulator = seed;

        while ((iterationResult = iterator.next(), !iterationResult.done)) {
            accumulator = fn(accumulator, iterationResult.value);
        }
        return accumulator;
    },

    filter(fn) {
        return Object.assign({
            [Symbol.iterator]: () => {
                const iterator = this[Symbol.iterator]();

                return {
                    next: () => {
                        let done, value;
                        do {
                            ({
                                done, value
                            } = iterator.next())
                        } while (!done && !fn(value));
                        return {
                            done, value
                        };
                    }
                }
            }
        }, LazyCollection)
    },

    find(fn) {
        return Object.assign({
            [Symbol.iterator]: () => {
                const iterator = this[Symbol.iterator]();

                return {
                    next: () => {
                        let {
                            done, value
                        } = iterator.next();

                        done = done || fn(value);

                        return ({
                            done, value: done ? undefined : value
                        });
                    }
                }
            }
        }, LazyCollection)
    },

    until(fn) {
        return Object.assign({
            [Symbol.iterator]: () => {
                const iterator = this[Symbol.iterator]();

                return {
                    next: () => {
                        let {
                            done, value
                        } = iterator.next();

                        done = done || fn(value);

                        return ({
                            done, value: done ? undefined : value
                        });
                    }
                }
            }
        }, LazyCollection)
    },

    first() {
        return this[Symbol.iterator]().next().value;
    },

    rest() {
        return Object.assign({
            [Symbol.iterator]: () => {
                const iterator = this[Symbol.iterator]();

                iterator.next();
                return iterator;
            }
        }, LazyCollection);
    },

    take(numberToTake) {
        return Object.assign({
            [Symbol.iterator]: () => {
                const iterator = this[Symbol.iterator]();
                let remainingElements = numberToTake;

                return {
                    next: () => {
                        let {
                            done, value
                        } = iterator.next();

                        done = done || remainingElements-- <= 0;

                        return ({
                            done, value: done ? undefined : value
                        });
                    }
                }
            }
        }, LazyCollection);
    }
}

const Numbers = Object.assign({
    [Symbol.iterator]: () => {
        let n = 0;

        return {
            next: () =>
                ({ done: false, value: n++ })
        }
    }
}, LazyCollection);


// Pair, a/k/a linked lists

const EMPTY = {
    isEmpty: () => true
};

const isEmpty = (node) => node === EMPTY;

const Pair = (car, cdr = EMPTY) =>
    Object.assign({
        car,
        cdr,
        isEmpty: () => false,
        [Symbol.iterator]: function () {
            let currentPair = this;

            return {
                next: () => {
                    if (currentPair.isEmpty()) {
                        return { done: true }
                    }
                    else {
                        const value = currentPair.car;

                        currentPair = currentPair.cdr;
                        return { done: false, value }
                    }
                }
            }
        }
    }, LazyCollection);

Pair.from = (iterable) =>
    (function iterationToList(iteration) {
        const { done, value } = iteration.next();

        return done ? EMPTY : Pair(value, iterationToList(iteration));
    })(iterable[Symbol.iterator]());

// Stack

const Stack = () =>
    Object.assign({
        array: [],
        index: -1,
        push: function (value) {
            return this.array[this.index += 1] = value;
        },
        pop: function () {
            const value = this.array[this.index];

            this.array[this.index] = undefined;
            if (this.index >= 0) {
                this.index -= 1
            }
            return value
        },
        isEmpty: function () {
            return this.index < 0
        },
        [Symbol.iterator]: function () {
            let iterationIndex = this.index;

            return {
                next: () => {
                    if (iterationIndex > this.index) {
                        iterationIndex = this.index;
                    }
                    if (iterationIndex < 0) {
                        return { done: true };
                    }
                    else {
                        return { done: false, value: this.array[iterationIndex--] }
                    }
                }
            }
        }
    }, LazyCollection);

Stack.from = function (iterable) {
    const stack = this();

    for (let element of iterable) {
        stack.push(element);
    }
    return stack;
}

// Pair and Stack in action

Stack.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .map((x) => {
        console.log(`squaring ${x}`);
        return x * x
    })
    .filter((x) => {
        console.log(`filtering ${x}`);
        return x % 2 == 0
    })
    .first()

//=> 100

// Pair.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
//     .map((x) => {
//         console.log(`squaring ${x}`);
//         return x * x
//     })
//     .filter((x) => {
//         console.log(`filtering ${x}`);
//         return x % 2 == 0
//     })
//     .first()

//=> 220


// const firstCubeOver1234 =
//     Numbers
//         .map((x) => {
//             console.log(`cubing ${x}`)
//             return x * x * x
//         }
//         )
//         .filter((x) => {
//             console.log(`filtering ${x}`)
//             return x > 1234
//         }
//         )
//         .first()