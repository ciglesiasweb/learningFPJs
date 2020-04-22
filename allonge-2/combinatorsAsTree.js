const K = x => y => x;
const I = (i) => (i);
const V = (x) => (y) => (z) => z(x)(y);

const pairFirst = K,
    pairRest = K(I),
    pair = V;

const first = (list) => list(
    () => "ERROR: Can't take first of an empty list",
    (aPair) => aPair(pairFirst)
);
const rest = (list) => list(
    () => "ERROR: Can't take first of an empty list",
    (aPair) => aPair(pairRest)
);

const length = (list) => list(
    () => 0,
    (aPair) => 1 + length(aPair(rest)))

const print = (list) => list(
    () => "",
    (aPair) => `${aPair(pairFirst)} ${print(aPair(pairRest))}`
);

const EMPTYLIST = (whenEmpty, unlessEmpty) => whenEmpty()
const node = (x) => (y) =>
    (whenEmpty, unlessEmpty) => unlessEmpty(pair(x)(y));


const l123 = node(1)(node(2)(node(3)(EMPTYLIST)));

console.log(print(l123));