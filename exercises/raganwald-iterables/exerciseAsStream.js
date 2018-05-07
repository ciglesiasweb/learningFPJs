const asStream = function * (iterable) { yield * iterable; };
const logContents = require('fs').readFileSync(__dirname + '/data', 'utf8')
const lines = str => str.split('\n');
const streamOfLines = asStream(lines(logContents));

function * mapIterableWith (mapFn, iterable) {
  for (const value of iterable) {
    yield mapFn(value);
  }
}

const leftPartialApply = (fn, ...values) => fn.bind(null, ...values);

const datums = str => str.split(', ');
const datumizeStream = leftPartialApply(mapIterableWith, datums);

const userKey = ([user, _]) => user;

const transitionsMaker = () => {
  let locations = [];

  return ([_, location]) => {
    locations.push(location);

    if (locations.length === 2) {
      const transition = locations;
      locations = locations.slice(1);
      return [transition];
    } else {
      return [];
    }
  }
}

const sortedFlatMap = (mapFnMaker, keyFn) =>
  function * (values) {
    const mappersByKey = new Map();

    for (const value of values) {
      const key = keyFn(value);
      let mapperFn;

      if (mappersByKey.has(key)) {
        mapperFn = mappersByKey.get(key);
      } else {
        mapperFn = mapFnMaker();
        mappersByKey.set(key, mapperFn);
      }

      yield * mapperFn(value);
    }
  };

const transitionsStream = sortedFlatMap(transitionsMaker, userKey);

const stringifyTransition = transition => transition.join(' -> ');
const stringifyStream = leftPartialApply(mapIterableWith, stringifyTransition);

const countTransitionStream = transitionKeys => {
  const transitionsToCounts = new Map();

  for (const transitionKey of transitionKeys) {
    if (transitionsToCounts.has(transitionKey)) {
      transitionsToCounts.set(transitionKey, 1 + transitionsToCounts.get(transitionKey));
    } else {
      transitionsToCounts.set(transitionKey, 1);
    }
  }
  return transitionsToCounts;
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
const pipeline = (...fns) => fns.reduceRight((a, b) => c => a(b(c)));

const theStreamSolution = pipeline(
  datumizeStream,
  transitionsStream,
  stringifyStream,
  countTransitionStream,
  greatestValue
);


a = theStreamSolution(streamOfLines)

for (e of a){
    console.log(e)
}