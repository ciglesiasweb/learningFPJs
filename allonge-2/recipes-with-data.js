// Exercise pg. 180 
const Y = (f) => {
    const something = x => f(v => x(x)(v));
    return something(something);
    };


const factorial = Y(function pruebas1(fac) {
    return function functionName(n) {
        return (n == 0 ? 1 : n * fac(n - 1));
    }
});

var a = factorial(3);
console.log(a);