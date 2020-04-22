// const isEmpty = ([first, ...rest]) => first === undefined;
// let a = ["11", ...["22", ...["33", ...[]]]]

// const length = ([first, ...rest]) =>
//     first === undefined ?
//     0 :
//     1 + length(rest);


const callLast = (fn, ...args) =>
    (...remainingArgs) =>
    fn(...remainingArgs, ...args);

const mapWithDelaysWork = (fn, [first, ...rest], prepend) =>
    first === undefined ?
    prepend :
    mapWithDelaysWork(fn, rest, [...prepend, fn(first)]);

const mapWith = callLast(mapWithDelaysWork, []);



let a = mapWith((x) => x * x, [1, 2, 3, 4, 5])
console.log(a)