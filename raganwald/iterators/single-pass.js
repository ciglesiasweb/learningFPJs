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


const theSinglePassSolution = (logContents) => {
  const lines = str => str.split('\n');
  const datums = str => str.split(', ');
const datumize = arr => arr.map(datums);
const stringifyTransition = transition => transition.join(' -> ');
const stringifyAllTransitions = arr => arr.map(stringifyTransition);

const stringTransitions = stringifyAllTransitions(allTransitions);
  const logLines = lines(logContents);
  const locationsByUser = new Map();
  const transitionsToCounts = new Map();
  let wasKeys = new Set();
  let wasCount = 0;

  for (const line of logLines) {
    const [user, location] = datums(line);

    if (locationsByUser.has(user)) {
      const locations = locationsByUser.get(user);
      locations.push(location);

      const transition = locations;
      locationsByUser.set(user, locations.slice(1));

      const transitionKey = stringifyTransition(transition);
      let count;
      if (transitionsToCounts.has(transitionKey)) {
        count = 1 + transitionsToCounts.get(transitionKey);
      } else {
        count = 1;
      }
      transitionsToCounts.set(transitionKey, count);

      if (count > wasCount) {
        wasKeys = new Set([transitionKey])
        wasCount = count;
      } else if (count === wasCount) {
        wasKeys.add(transitionKey);
      }
    } else {
      locationsByUser.set(user, [location]);
    }
  }

  return [wasKeys, wasCount];
}

console.log(
    theSinglePassSolution(logContents)
 ) 