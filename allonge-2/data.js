const mapWith = (fn) => (list) => list.map(fn);

const double = mapWith(x=> 2*x);

var a = double([1,13,4])
console.log(a);