const fs = require("fs");
const Matrix = require('../common/matrix');
const buffer = fs.readFileSync("i1.txt");
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

let visited = new Matrix(m, n);


function risk(i, j) {
    if (i === m - 1 && j == n - 1) return 0;
    if (memo[i] && memo[i][j] !== undefined) return memo[i][j];

    visited[i][j] = 1;
   // console.log(`${i}, ${j}`);

    let ret = Infinity;
    let dir = {
        i: 10000,
        j: 1000
    }

    if (i < m - 1 && !visited[i + 1][j]) {
        const s = risk(i + 1, j) + r[i + 1][j];
        if (s < ret) {
            dir.i = i +1;
            dir.j = j;
            ret = s;
        }
    }


    if (i > 0 && !visited[i - 1][j]) {
        const s = risk(i - 1, j) + r[i - 1][j];
        if (s < ret) {
            dir.i = i -1;
            dir.j = j;
            ret = s;
        }
    }


    if (j < n - 1 && !visited[i][j + 1]) {
        const s = risk(i, j + 1) + r[i][j + 1];
        if (s < ret) {
            dir.i = i;
            dir.j = j + 1;
            ret = s;
        }
    }


    if (j > 0 && !visited[i][j - 1]) {
        const s = risk(i, j - 1) + r[i][j - 1];
        if (s < ret) {
            dir.i = i;
            dir.j = j - 1;
            ret = s;
        }
    }

    if (!memo[i]) memo[i] = {};
    memo[i][j] = ret;
    visited[i][j] = 0;

    console.log(dir);

    return ret;
}



const score = risk(0, 0);
console.log(score);


// not 721
// not 719