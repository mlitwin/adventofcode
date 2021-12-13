const fs = require("fs");

const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();

const lines = fileContent.split(/\n/);

const nodes = {};

function addEdge(x,y) {
    if(!nodes[x]) nodes[x] = [];
    if(!nodes[y]) nodes[y] = [];

    nodes[x].push(y);
    nodes[y].push(x);


}


lines.forEach((l, i) => {
    const e = l.split('-');
    addEdge(e[0], e[1])
});

function markNode(visited, node) {
    const lower = (node === node.toLowerCase());
    if(lower) {
        if(!visited[node]) {
            visited[node] = 0;
        }
        visited[node]++;
    }
}

function maxVisited(visited) {
    for(k in visited) {
        if(visited[k] === 2) return 0;
    }

    return 1;''
}

function canVisit(visited, node) {
    const lower = (node === node.toLowerCase());
    if(!lower) return true;

    if(!visited[node]) return true;

    if( node === 'start' || node === 'end') return false;

   // return false;
    return visited[node] <= maxVisited(visited);
}

function pathCount(start, visited, smallLimit) {
    let paths = 0;
    if( start === 'end') return 1;

    const n = nodes[start];
    markNode(visited, start);

    n.forEach(next => {
        if(canVisit(visited, next)) {
            paths += pathCount(next, Object.assign({},visited), smallLimit);
        }
    });

    return paths;
}

const n = pathCount('start', {}, 0);

console.log(n)
