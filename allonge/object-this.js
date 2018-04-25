var a;
// const BetterQueue = () =>
//     ({
//         array: [],
//         head: 0,
//         tail: -1,
//         pushTail(value) {
//             return this.array[this.tail += 1] = value
//         },
//         pullHead() {
//             if (this.tail >= this.head) {
//                 let value = this.array[this.head];

//                 this.array[this.head] = undefined;
//                 this.head += 1;
//                 return value
//             }
//         },
//         isEmpty() {
//             return this.tail < this.head
//         }
//     });

// const betterQueue = BetterQueue();

// betterQueue.pushTail('Hello');
// betterQueue.pushTail('JavaScript');
// betterQueue.pullHead()

// const someObject = {
//     someFunction() {
//         return this;
//     }
// };

// a = someObject.someFunction() === someObject

// const someFunction = someObject.someFunction;
// a = [1, 2, 3];
// const contextualize = (fn, context) =>
//     (...args) =>
//         fn.apply(context, args)

// const accrete2 = contextualize(a.concat, a);
// b = accrete2([4,5]);

// var aFourthObject = {},
//     returnThis = function () { return this; };

// aFourthObject.uncontextualized = returnThis;
// aFourthObject.contextualized = contextualize(returnThis, aFourthObject);


// a = aFourthObject.uncontextualized() === aFourthObject // true

// a = aFourthObject.contextualized() === aFourthObject // true

// var uncontextualized = aFourthObject.uncontextualized,
//     contextualized = aFourthObject.contextualized;
// a = uncontextualized() === aFourthObject; //=> false

// a = contextualized() === aFourthObject //=> true

// console.log(a)


// NOT PRESERVE THIS
// const maybe = (fn) =>
//     x => x != null ? fn(x) : x;

const maybe = (fn) =>
  function (x) {
    return x != null ? fn.call(this, x) : x;
  };

const plus1 = x => x + 1;





const maybePlus1 = maybe(plus1);

a = maybePlus1(1)
//=> 2
a = maybePlus1(0)