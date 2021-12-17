const fs = require("fs");
const Matrix = require('../common/matrix');
const Graph = require('../common/graph');
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

let g = new Graph();

function addEdge(node, i, j) {
    if(i< 0 || i >= m) return;
    if(j< 0 || j >= n) return;
    const dest = `${i},${j}`;

    const cost = r[i][j];
    g.addDirectedEdge(node,dest, cost)
} 

r.eachElement((_v, i, j) => {
    const n = `${i},${j}`;
    addEdge(n, i -1, j);
    addEdge(n, i +1, j);
    addEdge(n, i, j - 1);
    addEdge(n, i, j +1);
});

const d = g.leastCostPath('0,0', `${m-1},${n-1}`);

console.log(d);
