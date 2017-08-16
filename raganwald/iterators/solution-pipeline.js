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

const lines = str => str.split('\n');
const logLines = lines(logContents);

const datums = str => str.split(', ');
const datumize = arr => arr.map(datums);

const listize = arr => arr.reduce(
  (map, [user, location]) => {
    if (map.has(user)) {
      map.get(user).push(location);
    } else {
      map.set(user, [location]);
    }
    return map;
  }, new Map());

const slicesOf = (sliceSize, array) =>
  Array(array.length - sliceSize + 1).fill().map((_,i) => array.slice(i, i+sliceSize));
const transitions = list => slicesOf(2, list);

const mapValues = (fn, inMap) => Array.from(inMap.entries()).reduce(
  (outMap, [key, value]) => {
    outMap.set(key, fn(value));
    return outMap;
  }, new Map());

const transitionize = mapValues.bind(null, transitions);

const reduceValues = (mergeFn, inMap) =>
  Array.from(inMap.entries())
    .map(([key, value]) => value)
      .reduce(mergeFn);

const concatValues = reduceValues.bind(null, (a, b) => a.concat(b));

const stringifyTransition = transition => transition.join(' -> ');
const stringifyAllTransitions = arr => arr.map(stringifyTransition);

const countTransitions = arr => arr.reduce(
  (transitionsToCounts, transitionKey) => {
    if (transitionsToCounts.has(transitionKey)) {
      transitionsToCounts.set(transitionKey, 1 + transitionsToCounts.get(transitionKey));
    } else {
      transitionsToCounts.set(transitionKey, 1);
    }
    return transitionsToCounts;
  }
  , new Map());

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

const pipeline = (...fns) => fns.reduceRight((a, b) => c => a(b(c)));

const theStagedSolution = pipeline(
  lines,
  datumize,
  listize,
  transitionize,
  concatValues,
  stringifyAllTransitions,
  countTransitions,
  greatestValue
);

console.log(
    theStagedSolution(logContents)
)