// instructions to extend
// initial
// const Queue = () => {
//     let array = [],
//         head = 0,
//         tail = -1;

//     return {
//       pushTail: (value) => array[++tail] = value,
//       pullHead: () => {
//         if (tail >= head) {
//           const value = array[head];

//           array[head] = undefined;
//           ++head;
//           return value
//         }
//       },
//       isEmpty: () => tail < head
//     }
//   };

// de-encapsulate
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