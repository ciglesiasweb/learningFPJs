// const callLeft = (fn, ...args) =>
//     (...remainingArgs) =>
//     fn(...args, ...remainingArgs);
// const foldArrayWith = (fn, terminalValue, [first, ...rest]) =>
//     first === undefined ?
//     terminalValue :
//     fn(first, foldArrayWith(fn, terminalValue, rest));
// const arraySum = callLeft(foldArrayWith, (a, b) => a + b, 0);
// var a = arraySum([1, 4, 9, 16, 25]);

// const callRight = (fn, ...args) =>
//     (...remainingArgs) =>
//     fn(...remainingArgs, ...args);
// const foldArrayWith = (fn, terminalValue, [first, ...rest]) =>
//     first === undefined ?
//     terminalValue :
//     fn(first, foldArrayWith(fn, terminalValue, rest));

// const foldArray = (array) => callRight(foldArrayWith, array);
// const sumFoldable = (folder) => folder((a, b) => a + b, 0);

// var a = sumFoldable(foldArray([1, 4, 9, 16, 25]))
// console.log(a);