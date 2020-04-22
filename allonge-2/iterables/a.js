const {Numbers, mapWith, filterWith, untilWith, first, rest} = require("./operations");


const Stack3 = () =>
    ({
        array: [],
        index: -1,
        push(value) {
            return this.array[this.index += 1] = value;
        },
        pop() {
            const value = this.array[this.index];
            this.array[this.index] = undefined;
            if (this.index >= 0) {
                this.index -= 1
            }
            return value
        },
        isEmpty() {
            return this.index < 0
        },
        [Symbol.iterator]() {
            let iterationIndex = this.index;
            let _this = this;
            return {
                next() {
                    if (iterationIndex > _this.index) {
                        iterationIndex = _this.index;
                    }
                    if (iterationIndex < 0) {
                        return {
                            done: true
                        };
                    } else {
                        return {
                            done: false,
                            value: _this.array[iterationIndex--]
                        }
                    }
                }
            }
        }
    });


Stack3.from = function (iterable) {
    const stack = this();
    for (let element of iterable) {
        stack.push(element);
    }
    return stack;
}
const stack = Stack3();
stack.push(2000);
stack.push(10);
stack.push(5)

const collectionSum = (collection) => {
    const iterator = collection[Symbol.iterator]();
    let eachIteration,
        sum = 0;
    while ((eachIteration = iterator.next(), !eachIteration.done)) {
        sum += eachIteration.value;
    }
    return sum
}


console.log(

    collectionSum(stack)
)


const numberList = Stack3.from(untilWith((x) => x > 10, Numbers));
console.log(numberList)