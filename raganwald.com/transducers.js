const reduceWith = (reducer, seed, iterable) => {
    let accumulation = seed;

    for (const value of iterable) {
        accumulation = reducer(accumulation, value);
    }

    return accumulation;
}


const arrayOf = (acc, val) => { acc.push(val); return acc; };
const sumOf = (acc, val) => acc + val;

const incrementSecondArgument =
    binaryFn =>
        (x, y) => binaryFn(x, y + 1);

const power =
    (base, exponent) => base ** exponent;

const higherPower = incrementSecondArgument(power);
const map =
    fn =>
        reducer =>
            (acc, val) => reducer(acc, fn(val));

const incrementValue = map(x => x + 1);

const squares = map(x => power(x, 2));
const one2ten = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

reduceWith(squares(arrayOf), [], one2ten)
//=> [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

const filter =
    fn =>
        reducer =>
            (acc, val) =>
                fn(val) ? reducer(acc, val) : acc;

var a = reduceWith(filter(x => x > 5)(squares(arrayOf)), [], one2ten)
var a = reduceWith(filter(x => x % 2 === 1)(squares(sumOf)), 0, one2ten)

console.log(a)

// const compose2 =
//     (a, b) =>
//         (...c) =>
//             a(b(...c));

const compositionOf = (acc, val) => (...args) => val(acc(...args));

const compose = (...fns) =>
    reduceWith(compositionOf, e => e, fns);


// const double = (x) => x + x; 
// const triple = (y) => y + y + y; 
// const fiveTimes = compose(double, triple)

// var a = fiveTimes(5)
// console.log(a)


const transduce = (transformer, reducer, seed, iterable) => {
    const transformedReducer = transformer(reducer);
    let accumulation = seed;
  
    for (const value of iterable) {
      accumulation = transformedReducer(accumulation, value);
    }
  
    return accumulation;
  }

  const squaresOfTheOddNumbers = compose(
    filter(x => x % 2 === 1),
    squares
  );


 var a =  transduce(squaresOfTheOddNumbers, sumOf, 0, one2ten)
 console.log(a)

 //RESUMING:
//  const arrayOf = (acc, val) => { acc.push(val); return acc; };


// const sumOf = (acc, val) => acc + val;

// const setOf = (acc, val) => acc.add(val);

// const map =
//   fn =>
//     reducer =>
//       (acc, val) => reducer(acc, fn(val));

// const filter =
//   fn =>
//     reducer =>
//       (acc, val) =>
//         fn(val) ? reducer(acc, val) : acc;

// const compose = (...fns) =>
//   fns.reduce((acc, val) => (...args) => val(acc(...args)), x => x);

// const transduce = (transformer, reducer, seed, iterable) => {
//   const transformedReducer = transformer(reducer);
//   let accumulation = seed;

//   for (const value of iterable) {
//     accumulation = transformedReducer(accumulation, value);
//   }

//   return accumulation;
// }