var exports = module.exports = {};

exports.Numbers = {
    [Symbol.iterator]() {
        let n = 0;
        return {
            next: () =>
                ({
                    done: false, // n>8 , // false
                    value: n++
                })
        }
    }
}


exports.mapWith = (fn, collection) =>
    ({
        [Symbol.iterator]() {
            const iterator = collection[Symbol.iterator]();
            return {
                next() {
                    const {
                        done,
                        value
                    } = iterator.next();

                    return ({
                        done,
                        value: done ? undefined : fn(value)
                    });
                }
            }
        }
    });

exports.filterWith = (fn, iterable) =>
    ({
        [Symbol.iterator]() {
            const iterator = iterable[Symbol.iterator]();
            return {
                next() {
                    let done, value;
                    do {
                        ({
                            done,
                            value
                        } = iterator.next());
                    } while (!done && !fn(value));
                    return {
                        done,
                        value
                    };
                }
            }
        }
    });

exports.untilWith = (fn, iterable) =>
    ({
        [Symbol.iterator]() {
            const iterator = iterable[Symbol.iterator]();
            return {
                next() {
                    let {
                        done,
                        value
                    } = iterator.next();
                    done = done || fn(value);
                    return ({
                        done,
                        value: done ? undefined : value
                    });
                }
            }
        }
    });

exports.first = (iterable) =>
    iterable[Symbol.iterator]().next().value;

exports.rest = (iterable) =>
    ({
        [Symbol.iterator]() {
            const iterator = iterable[Symbol.iterator]();
            iterator.next();
            return iterator;
        }
    });

// const Evens = filterWith( x => x % 3 === 1, Numbers)
// const Squares = mapWith((x) => x * x, Numbers);
// const EndWithOne = filterWith((x) => x % 10 === 1, Squares);
// const UpTo1000 = untilWith((x) => (x > 1000), EndWithOne);

// var a = [...UpTo1000];
// console.log('eee')