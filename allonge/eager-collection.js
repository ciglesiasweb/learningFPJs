// An eager collection, like an array, 
// returns a collection of its own type from each of the methods. 
// We can make an eager collection out of any collection that is gatherable, 
// meaning it has a .from method:



const EagerCollection = (gatherable) =>
    ({
        map(fn) {
            const original = this;

            return gatherable.from(
                (function* () {
                    for (let element of original) {
                        yield fn(element);
                    }
                })()
            );
        },

        reduce(fn, seed) {
            let accumulator = seed;

            for (let element of this) {
                accumulator = fn(accumulator, element);
            }
            return accumulator;
        },

        filter(fn) {
            const original = this;

            return gatherable.from(
                (function* () {
                    for (let element of original) {
                        if (fn(element)) yield element;
                    }
                })()
            );
        },

        find(fn) {
            for (let element of this) {
                if (fn(element)) return element;
            }
        },

        until(fn) {
            const original = this;

            return gatherable.from(
                (function* () {
                    for (let element of original) {
                        if (fn(element)) break;
                        yield element;
                    }
                })()
            );
        },

        first() {
            return this[Symbol.iterator]().next().value;
        },

        rest() {
            const iteration = this[Symbol.iterator]();

            iteration.next();
            return gatherable.from(
                (function* () {
                    yield* iteration;
                })()
            );
            return gatherable.from(iterable);
        },

        take(numberToTake) {
            const original = this;
            let numberRemaining = numberToTake;

            return gatherable.from(
                (function* () {
                    for (let element of original) {
                        if (numberRemaining-- <= 0) break;
                        yield element;
                    }
                })()
            );
        }
    });


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
    }, EagerCollection(Pair));

Pair.from = (iterable) =>
    (function iterationToList(iteration) {
        const { done, value } = iteration.next();

        return done ? EMPTY : Pair(value, iterationToList(iteration));
    })(iterable[Symbol.iterator]());

const a = Pair.from([1, 2, 3, 4, 5]).map(x => x * 2)
console.log(a)