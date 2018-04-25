// const stack = (() => {
//     let array = [],
//         index = -1;

//     const obj = {
//         push(value) { return array[index += 1] = value },
//         pop() {
//             const value = array[index];

//             array[index] = undefined;
//             if (index >= 0) {
//                 index -= 1
//             }
//             return value
//         },
//         isEmpty() { return index < 0 }
//     };

//     return obj;
// })();

const Stack = () => {
    const array = [];
    let index = -1;
  
    return {
      push (value) { return array[index += 1] = value },
      pop () {
        const value = array[index];
  
        array[index] = undefined;
        if (index >= 0) {
          index -= 1
        }
        return value
      },
      isEmpty () { return index < 0 }
    }
  }
  
  const stack = Stack();
  stack.push("Hello");
  stack.push("Good bye");
  
  stack.pop()
    //=> "Good bye"
  stack.pop()