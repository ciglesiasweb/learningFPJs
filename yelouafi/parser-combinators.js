var a;

// We'll use our own error description
function failure(expected, actual) {
    return { isFailure: true, expected, actual };
}

function success(data, rest) {
    return { data, rest };
}

// And for our main parsing, we'll invoke this function
function parse(parser, input) {
    const result = parser(input);
    if (result.isFailure) {
        throw new Error(`Parse error.
          expected ${result.expected}.
          instead found '${result.actual}'
      `);
    } else {
        return result;
    }
}

function text(match) {
    return function textParser(input) {
        if (input.startsWith(match)) {
            return success(match, input.slice(match.length));
        }
        return failure(`'${match}'`, input);
    };
}

function regex(regex) {
    const anchoredRegex = new RegExp(`^${regex.source}`);

    return function regexParser(input) {
        const match = anchoredRegex.exec(input);
        if (match != null) {
            const matchedText = match[0];
            return success(matchedText, input.slice(matchedText.length));
        }
        return failure(regex, input);
    };
}

function map(func, parser) {
    return function mapParser(input) {
        const result = parser(input);
        if (result.isFailure) return result;
        return success(func(result.data), result.rest);
    };
}

const decimal = map(x => +x, regex(/\d+(?:\.\d+)?/));


function apply(func, parsers) {
    return function applyParser(input) {
        const accData = [];
        let currentInput = input;

        for (const parser of parsers) {
            const result = parser(currentInput);
            if (result.isFailure) return result;
            accData.push(result.data);
            currentInput = result.rest;
        }

        return success(func(...accData), currentInput);
    };
}

// Yeah not the best name I guess
function sequence(...parsers) {
    return apply((...results) => results[results.length - 1], parsers);
}
function collect(...parsers) {
    return apply((...results) => results, parsers);
}
// var a = parse(
//     sequence(text("hello"), text(", "), text("world")),
//     "hello, world"
// )

// console.log(a)

// var a = parse(
//     collect(text("hello"), text(", "), text("world")),
//     "hello, world"
// )
// console.log(a)


const plus = text("+");
function eof(input) {
    if (input.length === 0) return success(null, input);
    return failure("end of input", input);
}

const plusExpr = apply((num1, _, num2) => num1 + num2, [
    decimal,
    plus,
    decimal,
    eof
]);

// var a = parse(plusExpr, "12+34")
// console.log(a)

function oneOf(...parsers) {
    return function oneOfParser(input) {
        for (const parser of parsers) {
            const result = parser(input);
            if (result.isFailure) continue;
            return result;
        }
        // We'll see later a way to improve error reporting
        return failure("oneOf", input);
    };
}

const opMap = {
    "+": (left, right) => left + right,
    "-": (left, right) => left - right,
    "*": (left, right) => left * right,
    "/": (left, right) => left / right
};

function getOp(op) {
    return opMap[op];
}


const op = map(getOp, oneOf(text("+"), text("-"), text("*"), text("/")));



const expr = apply((num1, opFunc, num2) => opFunc(num1, num2), [
    decimal,
    op,
    decimal,
    eof
]);

// var a = parse(expr, "12-34")
// console.log(a)


function label(parser, expected) {
    return function labelParser(input) {
        const result = parser(input);
        if (result.isFailure) {
            // replace the parser error with our custom one
            return failure(expected, result.actual);
        }
        return result;
    };
}

const decimal1 = map(x => +x, label(regex(/\d+(?:\.\d+)?/), "a decimal"));

const expr2 = apply((num1, opFunc, num2) => opFunc(num1, num2), [
    decimal1,
    label(op, "an arithmetic operator"),
    decimal1
  ]);

// var a = parse(expr2, "12+340")
// console.log(a)


// lexeme is a function which takes a parser for 'junk' (eg whitespaces, comments)
function lexeme(junk) {
    // and returns another function which takes a parser for some meaningful data
    return function createTokenParser(parser) {
      // the (second) function returns a parser that
      // parses the menaninful data then skips the junk
      return apply((data, _) => data, [parser, junk]);
    };
  }
  
  const spaces = regex(/\s*/);
  const token = lexeme(spaces);
  
  // redefine our experssion to skip leading and trailing spaces
  const expr3 = apply((_, num1, opFunc, num2) => opFunc(num1, num2), [
    spaces, // skips leading spaces
    token(decimal),
    token(label(op, "an arithmetic operator")),
    token(decimal), // skips trailing spaces
    eof
  ]);


  var a = parse(expr3, "12 + 2 ")
console.log(a)
