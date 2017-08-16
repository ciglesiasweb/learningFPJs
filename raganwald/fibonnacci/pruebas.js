// http://raganwald.com/2016/03/17/programs-must-be-written-for-people-to-read.html


function * tail (iterable) {
  const iterator = iterable[Symbol.iterator]();
  iterator.next();
  yield * iterator;
}

function * take (numberToTake, iterable) {
  const iterator = iterable[Symbol.iterator]();

  for (let i = 0; i < numberToTake; ++i) {
    const { done, value } = iterator.next();
    if (!done) yield value;
  }
}

// function * fibonacci () {
//   yield * zipWith((x, y) => x + y, fibonacci(), tail(fibonacci()));
// }

function * fibonacci () {
  yield 0;
  yield 1;
  yield * zipWith((x, y) => x + y, fibonacci(), tail(fibonacci()));
}

function * zipWith (zipper, ...iterables) {
  const iterators = iterables.map(i => i[Symbol.iterator]());

  while (true) {
    const pairs = iterators.map(j => j.next()),
          dones = pairs.map(p => p.done),
          values = pairs.map(p => p.value);

    if (dones.indexOf(true) >= 0) break;
    yield zipper(...values);
  }
};

/*
0
1
1
2
3
5
8
13
21  


// const a = zipWith((x, y) => x + y, [1, 2, 3], [1000, 2000, 3000])

// console.log(
//     [...take(2, a)]
// )