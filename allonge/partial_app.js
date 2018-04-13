const callFirst = (fn, larg) =>
    function (...rest) {
        return fn.call(this, larg, ...rest);
    }

const callLast = (fn, rarg) =>
    function (...rest) {
        return fn.call(this, ...rest, rarg);
    }


const callLeft = (fn, ...args) =>
    (...remainingArgs) =>
        fn(...args, ...remainingArgs);

const callRight = (fn, ...args) =>
    (...remainingArgs) =>
        fn(...remainingArgs, ...args);


const greet = (me, you) =>
    `Hello, ${you}, my name is ${me}`;

const heliosSaysHello = callFirst(greet, 'Helios');

// console.log(
//     heliosSaysHello('Eartha')
// )
// //=> 'Hello, Eartha, my name is Helios'

// const sayHelloToCeline = callLast(greet, 'Celine');
// console.log(
//     sayHelloToCeline('Eartha')
// )
//   //=> 'Hello, Celine, my name is Eartha'

const unary = (fn) =>
    fn.length === 1
        ? fn
        : function (something) {
            return fn.call(this, something)
        }

// console.log(

//     ['1', '2', '3'].map(unary(parseInt))

// )

const tap = (value, fn) => {
    const curried = (fn) => (
        typeof (fn) === 'function' && fn(value),
        value
    );

    return fn === undefined
        ? curried
        : curried(fn);
}

//   tap('espresso')((it) => {
//     console.log(`Our drink is '${it}'`) 
//   });

// tap('espresso')();

// tap('espresso', (it) => {
//     console.log(`Our drink is '${it}'`) 
//   });


const maybe = (fn) =>
    function (...args) {
        if (args.length === 0) {
            return
        }
        else {
            for (let arg of args) {
                if (arg == null) return;
            }
            return fn.apply(this, args)
        }
    }

//   const a = maybe((a, b, c) => a + b + c)(1, 2, 3)

const once = (fn) => {
    let done = false;

    return function () {
        return done ? void 0 : ((done = true), fn.apply(this, arguments))
    }
}

// const askedOnBlindDate = once(
//     () => "sure, why not?"
// );

// const a = askedOnBlindDate()
// //=> 'sure, why not?'

// const a1 = askedOnBlindDate()
// //=> undefined

// const a2 = askedOnBlindDate()
//     //=> undefined


// const firstAndButFirst = (first, ...butFirst) =>
//   [first, butFirst];



// const a = firstAndButFirst(1,2,4,5,6,7,8)
// const b =''

// const leftVariadic = (fn) => {
//     if (fn.length < 1) {
//         return fn;
//     }
//     else {
//         return function (...args) {
//             const gathered = args.slice(0, args.length - fn.length + 1),
//                 spread = args.slice(args.length - fn.length + 1);

//             return fn.apply(
//                 this, [gathered].concat(spread)
//             );
//         }
//     }
// };

// const butLastAndLast = leftVariadic((butLast, last) => [butLast, last]);

// const a = butLastAndLast('why', 'hello', 'there', 'little', 'droid')

// const compose = (a, ...rest) =>
//     rest.length === 0
//         ? a
//         : (c) => a(compose(...rest)(c))


// const compose = (...fns) =>
//     (value) =>
//         fns.reverse().reduce((acc, fn) => fn(acc), value);

const pipeline = (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);
