const slicesOf = (sliceSize, array) =>
  Array(array.length - sliceSize + 1).fill().map((_,i) => array.slice(i, i+sliceSize));

  
const transitions = list => slicesOf(3, list);

const a = transitions([44,66,88,99])
console.log(a)