const K = x => y => x;
const I = (i) => (i);
const V = (x) => (y) => (z) => z(x)(y);

// ----
const first = K,
    second = K(I),
    pair = (first) => (second) => (selector) => selector(first)(second);

const latin = pair("primus")("secundus");
var a = latin(first)
console.log(a);