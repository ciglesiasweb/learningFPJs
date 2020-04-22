const ThreeNumbers = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3
    }
}

const isIterable = (something) =>
    !!something[Symbol.iterator];
const TreeIterable = (iterable) =>
    ({
        [Symbol.iterator]: function* () {
            for (const e of iterable) {
                if (isIterable(e)) {
                    for (const ee of TreeIterable(e)) {
                        yield ee;
                    }
                } else {
                    yield e;
                }
            }
        }
    })

function* tree(iterable) {
    for (const e of iterable) {
        if (isIterable(e)) {
            yield* tree(e);
        } else {
            yield e;
        }
    }
};

function* append(...iterables) {
    for (const iterable of iterables) {
        yield* iterable;
    }
}

const lyrics = append(["a", "b", "c"], ["one", "two", "three"], ["do", "re", "me"]);
for (const word of lyrics) {
    console.log(word);
}