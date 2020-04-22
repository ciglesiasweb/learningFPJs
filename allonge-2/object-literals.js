const Mathematics = {
    abs: (a) => a < 0 ? -a : a
};
Mathematics.abs(-5)


const a = Mathematics.abs(3);
console.log(a);

const SecretDecoderRing = { //compact sintax
    encode(plaintext) {
        return plaintext
            .split('')
            .map(char => char.charCodeAt())
            .map(code => code + 1)
            .map(code => String.fromCharCode(code))
            .join('');
    },
    decode(cyphertext) {
        return cyphertext
            .split('')
            .map(char => char.charCodeAt())
            .map(code => code - 1)
            .map(code => String.fromCharCode(code))
            .join('');
    }
}
const b = SecretDecoderRing.encode("vdgdgdgd");
console.log(b);