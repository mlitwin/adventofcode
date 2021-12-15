const fs = require("fs");
const Matrix = require('../common/matrix');
const buffer = fs.readFileSync("input.txt");
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
    let ret = new Matrix(26, 26);
    m.eachElement((v, i, j) => {
        if(insert[i] && insert[i][j] !== undefined) {
            const k = insert[i][j];
        //    console.log(v);
            ret[i][k] += v;
            ret[k][j] += v;
        } else {
            ret[i][j] += v;
        }
    })
    return ret;
}

for(let k = 0; k < 40; k++) {
    start = doInsert(start);
}
//start.print();
let counts = [];
for(let k = 0; k < 26; k++) {
    counts.push([k,0]);
}
counts.forEach(c => {
    const v = c[0];
    for(let i =0; i < 26; i++) {
        const pairs = start[v][i];
        c[1] += pairs;
    }
});

const lastChar = charToCode(poly[poly.length -1]);

counts[lastChar][1]++;

console.log(counts);


counts.sort((a,b) => {
    return a[1] - b[1];
});
const nonZero = counts.filter((v) => {
    return v[1] > 0;
})
const spread = nonZero[nonZero.length -1][1] - nonZero[0][1];
console.log(spread);



