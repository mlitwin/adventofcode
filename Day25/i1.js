const fs = require("fs");
const Matrix = require('../common/matrix');
const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();


let lines = fileContent.split(/\n/);
const m = lines.length;
const n = lines[0].length;

let slugs = new Matrix(m, n);
lines.forEach((l, i) => {
    l.split('').forEach((c, j) => {
        slugs[i][j] = c;
    });
});

function dupe(m0) {
    let m = new Matrix(m0.m, m0.n);
    m0.eachElement((v,i,j) => {
        m[i][j] = v;
    });

    return m;
}

let gen = 0;
let moves = 1;

function moveH(m) {
    let mc = 0;
    const m0 = dupe(m);
    m0.eachElement((v,row,col) => {
        const r = row;
        const c = (col + 1) % m0.n;
       // console.log(`${row}`)
        if( v === '>' && m0[r][c] === '.') {
            m[row][col] = '.';
            m[r][c] = v;
            mc++
        }
    });

    return mc;
}

function moveV(m) {
    let mc = 0;
    const m0 = dupe(m);
    m0.eachElement((v,row,col) => {
        const r = (row + 1) % m0.m;
        const c = col;
        if( v === 'v' && m0[r][c] === '.') {
            m[row][col] = '.';
            m[r][c] = v;
            mc++
        }
    });

    return mc;
}

while(moves) {
    moves = 0;
    console.log(gen);
    slugs.print();

    moves += moveH(slugs);
  //  console.log('H moves')
//slugs.print();

    console.log(moves);

   // console.log('V moves')

    moves += moveV(slugs);
    console.log(moves);
    gen++;
}

console.log(gen);
