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

function parseOperator() {
    const lengthTypeId = bits[X++];

    if( lengthTypeId === 0) {
        const totalLengh = parseBits(15);
        const end = X + totalLengh;
        while(X < end) {
            parsePacket();
        }

    } else {
        const packetCount = parseBits(11);
        for(let i = 0; i < packetCount; i++) {
            parsePacket();
        }

    }
}

let versionSum = 0;

function parsePacket() {
    const version = parseBits(3);
    const typeId = parseBits(3);

    //console.log(version);
   // console.log(typeId);
   versionSum += version;

    if( typeId === 4) {
        parseLiteral();
    } else {
        parseOperator();
    }
}

parsePacket();

console.log(versionSum);



//console.log(bits);
