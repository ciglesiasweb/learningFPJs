// const Queue = () => {
//     let array = [],
//         head = 0,
//         tail = -1;
//     return {
//         pushTail: (value) => array[++tail] = value,
//         pullHead: () => {
//             if (tail >= head) {
//                 const value = array[head];
//                 array[head] = undefined;
//                 ++head;
//                 return value
//             }
//         },
//         isEmpty: () => tail < head
//     }
// };

//publicamos todo lo pivado 
const Queue = function () {
    const queue = {
        array: [],
        head: 0,
        tail: -1,
        pushTail: (value) =>
            queue.array[++queue.tail] = value,
        pullHead: () => {
            if (queue.tail >= queue.head) {
                const value = queue.array[queue.head];
                queue.array[queue.head] = undefined;
                queue.head += 1;
                return value
            }
        },
        isEmpty: () =>
            queue.tail < queue.head
    };
    return queue
};

const extend = function (consumer, ...providers) {
    for (let i = 0; i < providers.length; ++i) {
        const provider = providers[i];
        for (let key in provider) {
            if (provider.hasOwnProperty(key)) {
                consumer[key] = provider[key]
            }
        }
    }
    return consumer
};

const Dequeue = function () {
    const deque = Queue(),
        INCREMENT = 4;
    return Object.assign(deque, {
        size: () => deque.tail - deque.head + 1,
        pullTail: () => {
            if (!deque.isEmpty()) {
                const value = deque.array[deque.tail];
                deque.array[deque.tail] = undefined;
                deque.tail -= 1;
                return value
            }
        },
        pushHead: (value) => {
            if (deque.head === 0) {
                for (let i = deque.tail; i <= deque.head; i++) {
                    deque.array[i + INCREMENT] = deque.array[i]
                }
                deque.tail += INCREMENT
                deque.head += INCREMENT
            }
            return deque.array[deque.head -= 1] = value
        }
    })
};


// const queue = Queue();
// queue.pushTail("Hello");
// queue.pushTail("JavaScript");
// queue.pushTail("Allongé");
// var a = queue.pullHead() //=> "Hello"

// var b = queue.pullHead() //=> "JavaScript"
// console.log(b);