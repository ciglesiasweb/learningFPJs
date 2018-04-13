// ------------   basics
// const [car, ...cdr] = [1, 2, 3, 4, 5];
// const cons = [car, ...cdr];
// const oneTwoThree = ["one", "two", "three"];
// const c = ["zero", ...oneTwoThree]
// const [what] = [];  // undefined
// const [...they] = []; // [] 


// thinking - array creation 
const a1 = ["baz", ...[]]
const a2 = ["bar", ...["baz"]]
const a3 = ["foo", ...["bar", "baz"]]

// destructuring
// const [first, ...rest] = [];
// const [first, ...rest] = ["foo"];
// const [first, ...rest] = ["foo", "bar"];
const [first, ...rest] = ["foo", "bar", "baz"];


const isEmpty = ([first, ...rest]) => first === undefined;

const length = ([first, ...rest]) =>
  first === undefined
    ? 0
    : 1 + length(rest);


console.log('a')