function Graph() {
    this.nodes = {};
}


Graph.prototype.addNode = function (node) {
    if (this.nodes[node]) return;

    this.nodes[node] = [];
}

Graph.prototype.eachNode = function (callback) {
    for (k in this.nodes) {
        callback(k, this.nodes[k]);
    }
}

Graph.prototype.addDirectedEdge = function (a, b) {
    this.addNode(a);
    this.addNode(b);
    this.nodes[a].push(b);
}

Graph.prototype.addEdge = function (a, b) {
    this.addDirectedEdge(a, b);
    this.addDirectedEdge(b, a);
}

Graph.prototype.eachPath = function (refcon, context) {
    const start = context.start;
    const end = context.end;
    const visit = context.visit;
    const unvisit = context.unvisit;
    const callback = context.callback;
    const self = this;


    function seekPath(path, node) {
        if (visit(refcon, node)) {
            path.push(node);
            if (node === end) {
                callback(refcon, path);
            } else {
                self.nodes[node].forEach(next => {
                    seekPath(path, next);
                });
            }
            unvisit(refcon, node);
            path.pop();
        }
    }

    seekPath([], start);
}

module.exports = Graph;