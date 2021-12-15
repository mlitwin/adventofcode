const fs = require("fs");
const Matrix = require('../common/matrix');
const buffer = fs.readFileSync("i1.txt");
const fileContent = buffer.toString();


let lines = fileContent.split(/\n/);

const poly = lines[0].split('');
lines.shift(); lines.shift();

let insert = {};
let start = new Matrix(26,26);

function charToCode(c) {
    return c.charCodeAt(0) - 'A'.charCodeAt(0);
}

for(let i = 0; i < poly.length - 1; i++) {
    const x = charToCode(poly[i]);
    const y = charToCode(poly[i+1]);
    start[x][y]++;

}
//start.print();

lines.forEach(l => {
    const m = l.match(/(.)(.) -> (.)/);

    const x = charToCode(m[1]);
    const y = charToCode(m[2]);
    const z = charToCode(m[3]);
    if(!insert[x]) insert[x] = {};
    insert[x][y] = z;
});

let pp = poly.map(p => charToCode(p));
console.log(pp);

function doInsert(m) {
    let ret = []
    for(let i = 0; i< m.length -1; i++) {
        const x = m[i];
        const y = m[i+1];
        if(insert[x][y] !== undefined) {
            const z = insert[x][y];
            ret.push(x, z);
        } else {
            ret.push(z);
        }
    }
    ret.push(m[m.length-1]);
    return ret;
}

for(let k = 0; k < 40; k++) {
    pp = doInsert(pp);
}

let counts = [];
for(let k = 0; k < 26; k++) {
    counts.push([k,0]);
}
pp.forEach(c => {
    counts[c][1]++;
});
counts.sort((a,b) => {
    return a[1] - b[1];
});
const nonZero = counts.filter((v) => {
    return v[1] > 0;
})
console.log(nonZero);
const spread = nonZero[nonZero.length -1][1] - nonZero[0][1];
console.log(spread);



