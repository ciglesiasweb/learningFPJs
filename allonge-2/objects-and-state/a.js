const contextualize = (fn, context) =>
    (...args) =>
    fn.apply(context, args)





var aFourthObject = {},
    returnThis = function () {
        return this;
    };

aFourthObject.uncontextualized = returnThis;
aFourthObject.contextualized = contextualize(returnThis, aFourthObject);
// var a1 = aFourthObject.uncontextualized() === aFourthObject
//=> true
// var a2 = aFourthObject.contextualized() === aFourthObject
//=> true

var uncontextualized = aFourthObject.uncontextualized,
    contextualized = aFourthObject.contextualized;

var a1 = uncontextualized() === aFourthObject;
//=> false
var a2 = contextualized() === aFourthObject
//=> true

console.log(a1, a2)