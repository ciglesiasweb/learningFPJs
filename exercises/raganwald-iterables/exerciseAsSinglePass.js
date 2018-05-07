const logContents = require('fs').readFileSync(__dirname + '/data', 'utf8')
const datums = str => str.split(', ');
const stringifyTransition = transition => transition.join(' -> ');

const theSinglePassSolution = (logContents) => {
    const lines = str => str.split('\n');
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

var a = theSinglePassSolution(logContents)

console.log(a)