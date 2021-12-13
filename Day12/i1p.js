const fs = require("fs");
const Graph = require('../common/graph');

const buffer = fs.readFileSync("i3.txt");
const fileContent = buffer.toString();

const lines = fileContent.split(/\n/);

const nodes = {};

function addEdge(x,y) {
    if(!nodes[x]) nodes[x] = [];
    if(!nodes[y]) nodes[y] = [];

    nodes[x].push(y);
    nodes[y].push(x);


}

let g = new Graph();


lines.forEach((l, i) => {
    const e = l.split('-');
    addEdge(e[0], e[1]);
    g.addEdge(e[0], e[1]);
});

let refcon = {
    count: {},
    paths: 0
}

g.eachNode(n => {
    refcon.count[n] = 0;
});

g.eachPath(refcon, {
    start: 'start',
    end: 'end',
    visit: function(refcon, n) {
        const lower = (n === n.toLowerCase());
        if( lower && refcon.count[n]) return false;
        refcon.count[n]++;
        return true;

    },
    unvisit: function(refcon, n) {
        refcon.count[n]--;
    },
    callback: function(refcon, path) {
        refcon.paths++;
    }
});

console.log(refcon.paths);
