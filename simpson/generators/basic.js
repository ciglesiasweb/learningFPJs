// function *foo() {
//     yield 1;
//     return 2;
//     // yield 3;
//     // yield 4;
//     // yield 5;
// }

// var it = foo();
// var message = it.next();
// console.log(message); 
// message = it.next();
// console.log(message); 

function *foo() {
    yield 3;
    yield 4;
}

function *bar() {
    yield 1;
    yield 2;
    yield *foo(); // `yield *` delegates iteration control to `foo()`
    yield 5;
}

for (var v of bar()) {
    console.log( v );
}