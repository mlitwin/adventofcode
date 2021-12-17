const fs = require("fs");
const Matrix = require('../common/matrix');
const Graph = require('../common/graph');
const buffer = fs.readFileSync("i1.txt");
const fileContent = buffer.toString();


let lines = fileContent.split(/\n/);
const m = lines.length;
const n = lines[0].length;

const M = 5 * m;
const N = 5 * n;

let r = new Matrix(M, N);
lines.forEach((l, i) => {
    l.split('').forEach((c, j) => {
        r[i][j] = parseInt(c, 10);
    });
});

let g = new Graph();

function getCost(i,j) {
    if(r[i][j]) return r[i][j];
    let otherCost;
    if( i > 0) {
        otherCost = r[i - 5 * m][j] + 1;
        if( otherCost === 10) otherCost = 9;
    } else {
        otherCost = r[i][j - 5 * n] + 1;
        if( otherCost === 10) otherCost = 9;
    }

    r[i][j] = otherCost;

    return otherCost;
}

function addEdge(node, i, j) {
    if(i< 0 || i >= m) return;
    if(j< 0 || j >= n) return;
    const dest = `${i},${j}`;

    const cost = getCost(i,j);
    g.addDirectedEdge(node,dest, cost)
} 

r.eachElement((_v, i, j) => {
    const n = `${i},${j}`;
    addEdge(n, i -1, j);
    addEdge(n, i +1, j);
    addEdge(n, i, j - 1);
    addEdge(n, i, j +1);
});

r.print();

//const d = g.leastCostPath('0,0', `${m-1},${n-1}`);

//console.log(d);
