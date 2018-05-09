// const cons = (a, d) => [a, d],
//     car = ([a, d]) => a,
//     cdr = ([a, d]) => d;

// const oneToFive = cons(1, cons(2, cons(3, cons(4, cons(5, null)))));

// const head = car(oneToFive);
// const tail = cdr(oneToFive)
// console.log('a')


const EMPTY = {};
const OneTwoThree = {
    first: 1, rest: {
        first: 2, rest: {
            first: 3, rest: EMPTY
        }
    }
};

const length = (node, delayed = 0) =>
    node === EMPTY
        ? delayed
        : length(node.rest, delayed + 1);



const slowcopy = (node) =>
  node === EMPTY
    ? EMPTY
    : { first: node.first, rest: slowcopy(node.rest)};

const copy = slowcopy(OneTwoThree)

console.log('a')

const copy2 = (node, delayed = EMPTY) =>
  node === EMPTY
    ? delayed
    : copy2(node.rest, { first: node.first, rest: delayed });

const b = copy2(OneTwoThree)
console.log(b)