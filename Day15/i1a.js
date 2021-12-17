const fs = require("fs");
const Matrix = require('../common/matrix');
const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();


let lines = fileContent.split(/\n/);
const m = lines.length;
const n = lines[0].length;

let r = new Matrix(m, n);
lines.forEach((l, i) => {
    l.split('').forEach((c, j) => {
        r[i][j] = parseInt(c, 10);
    });
});

let memo = {};

let scores = new Matrix(m, n);

function setScore(i,j) {
    let ret = Infinity;
    if(i === n -1 && j === n -1) return;
    if( i < n - 1) {
        const s = r[i + 1][j] + scores[i+1][j];
        if( s < ret) ret = s;
    } 
    if( j < n - 1) {
        const s = r[i][j+1] + scores[i][j + 1];
        if( s < ret) ret = s;
    } 
    scores[i][j] = ret;
}

for(let k = n-1; k >= 0; k--) {
    let j = k;
    let i = n -1;
    while( j < n && i >= 0) {
        setScore(i, j);
       // console.log(`${i}, ${j}`)
        i--; j++;
    }
}


for(let k = n-2; k >= 0; k--) {
    let j = 0;
    let i = k;
    while( j < n && i >= 0) {
        setScore(i, j);

//        console.log(`${i}, ${j}`)
        i--; j++;
    }
}


//scores.print();
console.log(scores[0][0]);

//console.log(score);


// not 721
// not 719