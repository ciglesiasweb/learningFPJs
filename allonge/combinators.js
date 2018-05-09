//combinators
const K = (x) => (y) => x;
const I = (x) => (x);
const V = (x) => (y) => (z) => z(x)(y)

var a;
// // falta el operador T. conocido como tap
// const first = K,
//     second = K(I),
//     pair = V;

// const latin = pair("primus")("secundus");

// latin(first)
//   //=> "primus"

// latin(second)
//   //=> "secundus"

// const first = ({first, rest}) => first,
//       rest  = ({first, rest}) => rest,
//       pair = (first, rest) => ({first, rest}),
//       EMPTY = ({});

// const l123 = pair(1, pair(2, pair(3, EMPTY)));

// a = first(l123)
//   //=> 1

// a = first(rest(l123))
//   //=> 2

// a = first(rest(rest(l123)))

// const first = K,
//     rest = K(I),
//     pair = V,
//     EMPTY = (() => { });

// const l123 = pair(1)(pair(2)(pair(3)(EMPTY)));

// var a = l123(first)
// //=> 1

// a = l123(rest)(first)
// //=> 2

// a = l123(rest)(rest)(first)
// //=> 3

// console.log(a)


//canonical Y Combinator:
// const Y = (f) =>
//   ( x => f(v => x(x)(v)) )(
//     x => f(v => x(x)(v))
//   );

const Y = (f) => {
    // const something = x => f(v => x(x)(v));
    const something = function (x){
        return f( function insidesomething(v) { 
            return x(x)(v)})
    }
    return something(something);
  };


  const factorial = Y(function factorialDef1(fac) {
    return function factorialDef2(n) {
      return (n == 0 ? 1 : n * fac(n - 1));
    }
  });


  a = factorial(5);

  console.log(a)