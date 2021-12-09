const fs = require("fs");
const Matrix = require('../common/matrix');

const buffer = fs.readFileSync("input2.txt");
const fileContent = buffer.toString();

const lines = fileContent.split(/\n/);

const m = lines.length;
const n = lines[0].length;

const dep = new Matrix(m, n);

lines.forEach((l, i) => {
    l.trim().split('').forEach((d, j) => {
        dep[i][j] = parseInt(d);
    });
});

function depth(i, j) {
    if (i < 0 || j < 0 || i >= m || j >= n) {
        return 100;
    }
    return dep[i][j];
}

let cost = 0;

let basinMap = {};
function setBasin(i,j, code) {
    if (i < 0 || j < 0 || i >= m || j >= n) {
        return;
    }
    const k = `${i},${j}`;
    basinMap[k] = code;
}

function basinSize(i, j, lower, cur, visited) {
    if (i < 0 || j < 0 || i >= m || j >= n) {
        return cur;
    }

    const k = `${i},${j}`;
    if( visited[k]) {
        return cur;
    }
    visited[k] = 1;
    const newLower = dep[i][j];
    if( newLower < lower || newLower === 9) {
        return cur;
    }

    cur++;

    cur = basinSize(i - 1, j, newLower, cur, visited);
    cur = basinSize(i + 1, j, newLower, cur, visited);
    cur = basinSize(i, j - 1, newLower, cur, visited);
    cur = basinSize(i, j + 1, newLower, cur, visited);

    return cur;

}

function getBasin(i,j) {
    const k = `${i},${j}`;
    let ret;

    if( basinMap[k]) {
        return basinMap[k];
    }

    const d = depth(i, j);
    if( d === 9) {
        return;
    }

    if( d > depth(i - 1, j)) {
        ret = getBasin(i - 1, j);
    } else if(d > depth(i + 1, j)) {
        ret = getBasin(i + 1, j);
    } else if(d > depth(i, j - 1)) {
        ret = getBasin(i, j -1);
    } else if( d > depth(i, j + 1)) {
        ret = getBasin(i,j + 1);
    } else {
        ret = k;
    }

    basinMap[k] = ret;

    return ret;

}

for (let j = 0; j < n; j++) {
    for (let i = 0; i < m; i++) {
        getBasin(i,j);
    }
}

//dep.print();
let basinCounts = {};
for(let k in basinMap) {
    const b = basinMap[k];
    if(!basinCounts[b]) {
        basinCounts[b]=0; 
    }
    basinCounts[b]++;
}

let bList = [];
for(let k in basinCounts) {
    bList.push(basinCounts[k]);
}
bList.sort((a,b) => b - a);
console.log(bList);
const score = bList[0] * bList[1] * bList[2];
console.log(score);

