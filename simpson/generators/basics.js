var x = 1;

function *foo() {
	x++;
	yield; // pause!
	console.log( "x:", x );
}

function bar() {
	x++;
}

var it = foo();
// start `foo()` here!
it.next();
x;						// 2
bar();
x;						// 3
it.next();
it.next()

console.log('aaaaaaaaaaaaa')