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

// const lines = str => str.split('\n');
// const logLines = lines(logContents);

// const datums = str => str.split(', ');
// const datumize = arr => arr.map(datums);

// const data = datumize(logLines);
// // console.log(data);
// const listize = arr => arr.reduce(
//   (map, [user, location]) => {
//     if (map.has(user)) {
//       map.get(user).push(location);
//     } else {
//       map.set(user, [location]);
//     }
//     return map;
//   }, new Map());

// const locationsByUser = listize(data);

// // creamos transitions:

// const slicesOf = (sliceSize, array) =>
//   Array(array.length - sliceSize + 1).fill().map((_,i) => array.slice(i, i+sliceSize));

  
// const transitions = list => slicesOf(2, list);

// const transitionsByUser = Array.from(locationsByUser.entries()).reduce(
//   (map, [user, listOfLocations]) => {
//     map.set(user, transitions(listOfLocations));
//     return map;
//   }, new Map());


// const reduceValues = (mergeFn, inMap) =>
//   Array.from(inMap.entries())
//     .map(([key, value]) => value)
//       .reduce(mergeFn);

// const concatValues = reduceValues.bind(null, (a, b) => a.concat(b));

// const allTransitions = concatValues(transitionsByUser);
// // debugger
// const stringifyTransition = transition => transition.join(' -> ');
// const stringifyAllTransitions = arr => arr.map(stringifyTransition);

// const stringTransitions = stringifyAllTransitions(allTransitions);
// console.log(stringTransitions)

// const countTransitions = arr => arr.reduce(
//   (transitionsToCounts, transitionKey) => {
//     if (transitionsToCounts.has(transitionKey)) {
//       transitionsToCounts.set(transitionKey, 1 + transitionsToCounts.get(transitionKey));
//     } else {
//       transitionsToCounts.set(transitionKey, 1);
//     }
//     return transitionsToCounts;
//   }
//   , new Map());

// const counts = countTransitions(stringTransitions);

// const greatestValue = inMap =>
//   Array.from(inMap.entries()).reduce(
//     ([wasKeys, wasCount], [transitionKey, count]) => {
//       if (count < wasCount) {
//         return [wasKeys, wasCount];
//       } else if (count > wasCount) {
//         return [new Set([transitionKey]), count];
//       } else {
//         wasKeys.add(transitionKey);
//         return [wasKeys, wasCount];
//       }
//     }
//     , [new Set(), 0]
//   );

// greatestValue(counts);

// inicio streams:
function * asStream (iterable) { yield * iterable; };

const lines = str => str.split('\n');
const streamOfLines = asStream(lines(logContents));

function * mapIterableWith (mapFn, iterable) {
  for (const value of iterable) {
    yield mapFn(value);
  }
}

const datums = str => str.split(', ');
const datumizeStream = iterable => mapIterableWith(datums, iterable);

// or the equivalent:
// const datumizeStream = mapIterableWith.bind(null, datums);

// or this:
const leftPartialApply = (fn, ...values) => fn.bind(null, ...values);
// const datumizeStream = leftPartialApply(mapIterableWith, datums);

const userKey = ([user, _]) => user;

let locations = [];

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
// console.log(
// stringifyStream(transitionsStream(datumizeStream(streamOfLines)))
// )

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


//   const pipeline = (...fns) => fns.reduceRight((a, b) => c => a(b(c)));

// const theStreamSolution = pipeline(
//   datumizeStream,
//   transitionsStream,
//   stringifyStream,
//   countTransitionStream,
//   greatestValue
// );

greatestValue(
  countTransitionStream(
    stringifyStream(
      transitionsStream(
        datumizeStream(
          streamOfLines
        )
      )
    )
  )
)
console.log(
theStreamSolution(streamOfLines)
 )