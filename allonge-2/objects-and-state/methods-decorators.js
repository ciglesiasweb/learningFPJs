// const maybe = (fn) => //DONT PRESERVE THIS!
//     x => x != null ? fn(x) : x;

// const plus1 = x => x + 1;
// const maybePlus1 = maybe(plus1);




// const maybe = (fn) =>
//     function (x) {
//         return x != null ? fn.call(this, x) : x;
//     };

const maybe = (fn) =>
    function (...args) {
        for (const i in args) {
            if (args[i] == null) return args[i];
        }
        return fn.apply(this, args);
    };


const someObject = {
    setSize: maybe(function (size) {
        this.size = size;
    })
}


someObject.setSize(5);