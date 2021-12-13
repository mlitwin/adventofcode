const fs = require("fs");

const buffer = fs.readFileSync("i1.txt");
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

function pathCount(start, visited) {
    let paths = 0;
    if( start === 'end') return 1;

    const n = nodes[start];
    if( start === start.toLowerCase()) {
        visited[start] = 1;
    }

    n.forEach(next => {
        if(!visited[next]) {
            paths += pathCount(next, Object.assign({},visited));
        }
    });

    return paths;
}

const n = pathCount('start', {});

console.log(n)
