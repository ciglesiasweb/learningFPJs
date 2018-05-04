const mapWith = (fn, iterable) =>
    ({
        [Symbol.iterator]: () => {
            const iterator = iterable[Symbol.iterator]();

            return {
                next: () => {
                    const { done, value } = iterator.next();

                    return ({ done, value: done ? undefined : fn(value) });
                }
            }
        }
    });


function* mapWith(fn, iterable) {
    for (const element of iterable) {
        yield fn(element);
    }
}

function* filterWith(fn, iterable) {
    for (const element of iterable) {
        if (!!fn(element)) yield element;
    }
}

function* untilWith(fn, iterable) {
    for (const element of iterable) {
        if (fn(element)) break;
        yield fn(element);
    }
}

const first = (iterable) =>
    iterable[Symbol.iterator]().next().value;

function* rest(iterable) {
    const iterator = iterable[Symbol.iterator]();

    iterator.next();
    yield* iterator;
}