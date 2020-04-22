const moveLookupTable = {
    [
        [
            ' ', ' ', ' ',
            ' ', ' ', ' ',
            ' ', ' ', ' '
        ]
    ]: 0,
    [
        [
            'o', 'x', ' ',
            ' ', ' ', ' ',
            ' ', ' ', ' '
        ]
    ]: 6,
    [
        [
            'o', 'x', 'x',
            ' ', ' ', ' ',
            'o', ' ', ' '
        ]
    ]: 3,
    [
        [
            'o', 'x', ' ',
            'x', ' ', ' ',
            'o', ' ', ' '
        ]
    ]: 8,
    [
        [
            'o', 'x', ' ',
            ' ', 'x', ' ',
            'o', ' ', ' '
        ]
    ]: 3,
    [
        [
            'o', 'x', ' ',
            ' ', ' ', 'x',
            'o', ' ', ' '
        ]
    ]: 3,
    [
        [
            'o', 'x', ' ',
            ' ', ' ', ' ',
            'o', 'x', ' '
        ]
    ]: 3,
    [
        [
            'o', 'x', ' ',
            ' ', ' ', ' ',
            'o', ' ', 'x'
        ]
    ]: 3
    // ...
};

// {
//     "o,x, , , , , , , ":6,
//     "o,x,x, , , ,o, , ":3,
//     "o,x, ,x, , ,o, , ":8,
//     "o,x, , ,x, ,o, , ":3,
//     "o,x, , , ,x,o, , ":3,
//     "o,x, , , , ,o,x, ":3,
//     "o,x, , , , ,o, ,x":3
//     }


const statefulNaughtsAndCrosses = () => {
    const state = [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
    ];
    return (x = false) => {
        if (x) {
            if (state[x] === ' ') {
                state[x] = 'x';
            } else throw "occupied!"
        }
        let o = moveLookupTable[state];
        state[o] = 'o';
        return o;
    }
};

const aNaughtsAndCrossesGame = statefulNaughtsAndCrosses();
console.log(
    // our opponent makes the first move
    aNaughtsAndCrossesGame()
    //=> 0
)
console.log(
// then we move, and get its next move back
aNaughtsAndCrossesGame(1)
)
//=> 6
// then we move, and get its next move back
console.log(
aNaughtsAndCrossesGame(4)
)