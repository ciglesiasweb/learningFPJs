const a = `hello, dddd dfdf hello , ddd,, hello`;

function times(str){
    return str.match(/hello/g)
}

let occ = times(a);
console.log(occ);


const times = key => str => (str || '').match(/hello/g).length