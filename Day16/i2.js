const fs = require("fs");
const Matrix = require('../common/matrix');
const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();

const hexToBits = {
'0' : '0000',
'1' : '0001',
'2' : '0010',
'3' : '0011',
'4' : '0100',
'5' : '0101',
'6' : '0110',
'7' : '0111',
'8' : '1000',
'9' : '1001',
'A' : '1010',
'B' : '1011',
'C' : '1100',
'D' : '1101',
'E' : '1110',
'F' : '1111'
}

let X = 0;

const bits = fileContent.split('')
    .map(h => hexToBits[h])
    .join('')
    .split('')
    .map(x => parseInt(x));

function parseBits(count) {
    let v = '';
    for(let i = X; i < X + count; i++) {
        v += bits[i]
    }
    X += count;


    return parseInt(v, 2);

}

function parseLiteral() {
    let v = '';
    let last = false;
    while(!last) {
        last = (bits[X++] === 0);
        for(let i = 0; i < 4; i++) {
            v += bits[X++];
        }
    }
    const ret = parseInt(v, 2);

    return ret;
}

function parseOperator(typeId) {
    const lengthTypeId = bits[X++];

    let args = [];

    if( lengthTypeId === 0) {
        const totalLengh = parseBits(15);
        const end = X + totalLengh;
        while(X < end) {
            args.push(parsePacket());
        }

    } else {
        const packetCount = parseBits(11);
        for(let i = 0; i < packetCount; i++) {
            args.push(parsePacket());
        }
    }
    switch(typeId) {
        case 0: // sum
            return args.reduce((prev, cur) => prev + cur, 0);
        case 1: // product
            return args.reduce((prev, cur) => prev * cur, 1);
        case 2: // min
            return args.reduce((prev, cur) => Math.min(prev, cur), Infinity);
        case 3: // max
            return args.reduce((prev, cur) => Math.max(prev, cur), -Infinity);
        case 5: // gt
            return args[0] > args[1] ? 1 : 0;
        case 6: // lt
            return args[0] < args[1] ? 1 : 0;
        case 7: // eq
            return args[0] === args[1] ? 1 : 0;
    }
}

function parsePacket() {
    const version = parseBits(3);
    const typeId = parseBits(3);

    //console.log(version);
   // console.log(typeId);

    if( typeId === 4) {
        return parseLiteral();
    } else {
        return parseOperator(typeId);
    }
}

const ret = parsePacket();

console.log(ret);



//console.log(bits);
