var a;
//memoized
const memoized = (fn, keymaker = JSON.stringify) => {
    const lookupTable = {};

    return function (...args) {
        const key = keymaker.apply(this, args);

        return lookupTable[key] || (lookupTable[key] = fn.apply(this, args));
    }
}


const fastFibonacci = memoized(
    (n) =>
        n < 2
            ? n
            : fastFibonacci(n - 2) + fastFibonacci(n - 1)
);


//mapwith and getProp
const mapWith = (fn) => (list) => list.map(fn);

const getWith = (attr) => (object) => object[attr]
const maybe = (fn) =>
  function (x) {
    return x != null ? fn.call(this, x) : x;
  };


const inventories = [
    { apples: 0, oranges: 144, eggs: 36 },
    { apples: 240, oranges: 54, eggs: 12 },
    { apples: 24, oranges: 12, eggs: 42 },
];

a = mapWith(maybe(getWith('oranges')))(inventories)


//pluckWith. This pattern of combining mapWith and getWith is very frequent in JavaScript code
// const pluckWith = compose(mapWith, getWith);
// const pluckWith = (attr) => mapWith(getWith(attr));
// a = pluckWith('eggs')(inventories)

// const eggsByStore = pluckWith('eggs');
console.log(a)



const deepMapWith = (fn) =>
  function innerdeepMapWith (tree) {
    return Array.prototype.map.call(tree, (element) =>
      Array.isArray(element)
        ? innerdeepMapWith(element)
        : fn(element)
    );
  };