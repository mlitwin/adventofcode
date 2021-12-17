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

r[0][0] = 0;
let visited = new Matrix(m, n);

let oneScore = 0;
for(let i = 0; i < n; i++) {
    oneScore += r[0][i];
    oneScore += r[m-1][i];
}

let minscore = oneScore;
minscore = 719; // from i1a

function visit(i,j,score) {
    if( i< 0 || j < 0 || i >=m || j>=n) return;
    if( visited[i][j]) return;

    //console.log(`${i},${j}`);

    score += r[i][j];
    if( score >= minscore) return;
    if(i === m -1 && j === n-1) {
        if(score < minscore) {
            minscore = score;
            console.log(minscore);
        }
        return;
    }

    visited[i][j] = 1;

    visit(i+1,j, score);
    visit(i,j +1, score);
    visit(i-1,j, score);
    visit(i,j - 1, score);

    visited[i][j] = 0;

}

visit(0,0,0);


console.log(minscore);


// not 721
// not 719