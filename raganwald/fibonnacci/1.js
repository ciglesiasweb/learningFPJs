// function fibonacci (numberToPrint) {
//   console.log(0);

//   if (numberToPrint === 1) return;

//   console.log(1);

//   if (numberToPrint === 2) return;

//   let [previous, current] = [0, 1];

//   for(let numberPrinted = 2; numberPrinted <= numberToPrint; ++numberPrinted) {
//     [previous, current] = [current, current + previous];
//     console.log(current);
//   }
// }
// fibonacci(7);

function * fibonacci () {
  yield 0;
  yield 1;

  let [previous, current] = [0, 1];

  while (true) {
    [previous, current] = [current, current + previous];
    yield current;
  }
}

function * take (numberToTake, iterable) {
  const iterator = iterable[Symbol.iterator]();

  for (let i = 0; i < numberToTake; ++i) {
    const { done, value } = iterator.next();
    if (!done) yield value;
  }
}

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


*/

// for (let n of take(10, fibonacci())) {
//   console.log(n);
// }

const a = [...take(10, fibonacci())]
console.log(a)

function at (index, iterable) {
  const iterator = iterable[Symbol.iterator]();
  let value = undefined;

  for (let i = 0; i <= index; ++i) {
    value = iterator.next().value;
  }

  return value;
}

at(7, fibonacci())
