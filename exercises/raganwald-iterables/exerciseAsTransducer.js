const arrayOf = (acc, val) => { acc.push(val); return acc; };

const sumOf = (acc, val) => acc + val;

const setOf = (acc, val) => acc.add(val);

const map =
  fn =>
    reducer =>
      (acc, val) => reducer(acc, fn(val));

const filter =
  fn =>
    reducer =>
      (acc, val) =>
        fn(val) ? reducer(acc, val) : acc;

const compose = (...fns) =>
  fns.reduce((acc, val) => (...args) => val(acc(...args)), x => x);

const transduce = (transformer, reducer, seed, iterable) => {
  const transformedReducer = transformer(reducer);
  let accumulation = seed;

  for (const value of iterable) {
    accumulation = transformedReducer(accumulation, value);
  }

  return accumulation;
}

const logContents = `1a2ddc2, 5f2b932
f1a543f, 5890595
3abe124, bd11537
f1a543f, 5f2b932
f1a543f, bd11537
f1a543f, 5890595
1a2ddc2, bd11537
1a2ddc2, 5890595
3abe124, 5f2b932
f1a543f, 5f2b932
f1a543f, bd11537
f1a543f, 5890595
1a2ddc2, 5f2b932
1a2ddc2, bd11537
1a2ddc2, 5890595`;

const asStream = function * (iterable) { yield * iterable; };

const lines = str => str.split('\n');
const streamOfLines = asStream(lines(logContents));

const datums = str => str.split(', ');
const datumize = map(datums);

const userKey = ([user, _]) => user;

const pairMaker = () => {
  let wip = [];

  return reducer =>
    (acc, val) => {
      wip.push(val);

      if (wip.length === 2) {
        const pair = wip;
        wip = wip.slice(1);
        return reducer(acc, pair);
      } else {
        return acc;
      }
  }
}

const sortedTransformation =
  (xfMaker, keyFn) => {
    const decoratedReducersByKey = new Map();

    return reducer =>
      (acc, val) => {
        const key = keyFn(val);
        let decoratedReducer;

        if (decoratedReducersByKey.has(key)) {
          decoratedReducer = decoratedReducersByKey.get(key);
        } else {
          decoratedReducer = xfMaker()(reducer);
          decoratedReducersByKey.set(key, decoratedReducer);
        }

        return decoratedReducer(acc, val);
      }
  }

const userTransitions = sortedTransformation(pairMaker, userKey);

const justLocations = map(([[u1, l1], [u2, l2]]) => [l1, l2]);

const stringify = map(transition => transition.join(' -> '));

const transitionKeys = compose(
  stringify, justLocations, userTransitions, datumize
);

const countsOf =
  (acc, val) => {
    if (acc.has(val)) {
      acc.set(val, 1 + acc.get(val));
    } else {
      acc.set(val, 1);
    }
    return acc;
  }

const greatestValue = inMap =>
  Array.from(inMap.entries()).reduce(
    ([wasKeys, wasCount], [transitionKey, count]) => {
      if (count < wasCount) {
        return [wasKeys, wasCount];
      } else if (count > wasCount) {
        return [new Set([transitionKey]), count];
      } else {
        wasKeys.add(transitionKey);
        return [wasKeys, wasCount];
      }
    }
    , [new Set(), 0]
  );

var a = greatestValue(
  transduce(transitionKeys, countsOf, new Map(), streamOfLines)
)

console.log(a)