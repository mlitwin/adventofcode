function Graph() {
    this.nodes = {};
    this.edgeCost = {};
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

Graph.prototype.addDirectedEdge = function (a, b, cost) {
    this.addNode(a);
    this.addNode(b);
    this.nodes[a].push(b);
    if(!this.edgeCost[a]) this.edgeCost[a] = {};
    this.edgeCost[a][b] = cost;
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

function PriorityQueue() {
    this.cost = {};
    this.index = {};
    this.q = [];
}

PriorityQueue.prototype.isEmpty = function() {
    return this.q.length === 0;
}

PriorityQueue.prototype.contains = function(v) {
    return this.index[v] !== undefined;
}

/**
 * Return 0 <= i <= array.length such that !pred(array[i - 1]) && pred(array[i]).
 */
function binarySearch(array, pred) {
    let lo = -1, hi = array.length;
    while (1 + lo < hi) {
        const mi = lo + ((hi - lo) >> 1);
        if (pred(mi)) {
            hi = mi;
        } else {
            lo = mi;
        }
    }
    return hi;
}

function binarySearch2(array, comp) {
  var low = 0
  var high = array.length

  while (low < high) {
    var mid = Math.floor((low + high) / 2)
    let c = comp(mid);

    if (c < 0) {
      low = mid + 1
    } else if (c > 0) {
      high = mid
    } else {
      return mid
    }
  }

  return high
}

PriorityQueue.prototype.push = function(v, cost) {
    console.log(`push(${v}, ${cost})`);
   if(this.contains(v)) {
       const cur = this.q.findIndex(v);
       this.q.splice(cur, 1);
   }
   let self = this;

   const insert = binarySearch2(self.q, (x) => {
       const val = this.q[x];
       const xC = this.cost[val];
       console.log(`${x} ${val} ${cost} ${xC}`)
       return cost - this.cost[val];
   });
   console.log(this.q.length -insert);


    this.q.splice(insert, 0, v);
    this.cost[v] = cost;
    console.log(this.q);
  //  this.index[v] = i;
    

//console.log(this.q.length);


    this.cost[v] = cost;

/*
   let i;

   for(i = 0; i < this.q.length; i++) {
       if(cost < this.cost[this.q[i]]) {
           this.q.splice(i, 0, v);
           this.index[v] = i;
           break;
       }
   }
   if(i === this.q.length) {
       this.q.push(v);
       this.index[v] = i;
   }
   */
}

PriorityQueue.prototype.pop = function() {
   const v = this.q.pop();
  // delete this.index[v];
   delete this.cost[v];
   return v;
}

function getMinNode(Q, dist) {
    let min = Infinity;
    let ret;

    for(k in Q) {
        if( dist[k] < min) {
            ret = k;
            min = dist[k];
        }
    }
    delete Q[ret];
    return ret;

}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

Graph.prototype.leastCostPath = function(start, end) {
  let V = {};
  let dist = {};
  let prev = {};

  this.eachNode(node => {
      dist[node] = Infinity;
      prev[node] = null;

      V[node] = {};

  });
  dist[start] = 0;

  while(!isEmpty(V)) {
      const u = getMinNode(V, dist);
      if( u === end) {
          return dist[u];
      }
      this.nodes[u].forEach(v => {
          if( v in V) {
              let alt = dist[u] + this.edgeCost[u][v];
              if( alt < dist[v]) {
                  dist[v] =  alt;
                  prev[v] = u;
              }
          }
      });
  }
}


Graph.prototype.leastCostPath2 = function(start, end) {
  let Q = new PriorityQueue();;
  let dist = {};
  let prev = {};
  
  dist[start] = 0;


  this.eachNode(v => {
      if(v !== start) {
        dist[v] = Infinity;
        prev[v] = null;
      }
     Q.push(v,  dist[v]);
  });

  while(!Q.isEmpty()) {
      const u = Q.pop();
      if( u === end) {
         return dist[u];
      }


      this.nodes[u].forEach(v => {
           //  console.log(Q.q.map(v => Q.cost[v]));

          if( Q.contains(v)) {
              const uDist = dist[u];

              let alt = dist[u] + this.edgeCost[u][v];
            //  console.log(dist[u]);
            //  console.log(this.edgeCost[u][v]);
             // console.log(alt);
              if( alt < dist[v]) {
                  dist[v] = alt;
                  prev[v] = u;
                  Q.push(v, alt);
              }
          }
      });
  }
  console.log(dist);
}

const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

function Node(key, priority) {
    this.key = key;
    this.priority = priority;
}

function PriorityQueue2() {
    this.data = [];
}

PriorityQueue2.prototype.push = function push(key, priority) {
    const node = new Node(key, priority);
    this.data.push(node);
    let index = this.data.length - 1;
    while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        const parent = this.data[parentIndex];
        if (node.priority < parent.priority) {
            swap(this.data, index, parentIndex);
            index = parentIndex;
        } else {
            break;
        }
    }
};

PriorityQueue2.prototype.shift = function shift() {
    const minNode = this.data[0] || {};
    const lastNode = this.data.pop();
    if (this.data.length < 1) {
        return minNode;
    }
    this.data[0] = lastNode;
    let index = 0;
    while (index < this.data.length) {
        const leftIndex = 2 * index + 1;
        const rightIndex = 2 * index + 2;
        const leftNode = this.data[leftIndex] || {};
        const rightNode = this.data[rightIndex] || {};
        let smallerIndex;
        if (leftNode.priority < lastNode.priority) {
            smallerIndex = leftIndex;
        }
        if (!smallerIndex && rightNode.priority < lastNode.priority) {
            smallerIndex = rightIndex;
        }
        if (smallerIndex && rightNode.priority < leftNode.priority) {
            smallerIndex = rightIndex;
        }
        if (!smallerIndex) {
            break;
        }
        swap(this.data, smallerIndex, index);
        index = smallerIndex;
    }
    return minNode;
}

// https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/discuss/1004540/Javascript-Dijkstra-Algorithm-with-Priority-Queue

Graph.prototype.leastCostPath3 = function(start, end) {
  let Q = new PriorityQueue2();;
  let d = {};
  let prev = {};
  

  this.eachNode(v => {
      if(v !== start) {
        d[v] = Infinity;
        prev[v] = null;
      }
  });

    d[start] = 0;
    Q.push(start,  d[start]);


  while(Q.data.length) {
      const elem = Q.shift();
      const u = elem.key;
      const k = elem.priority;


    if(k <= d[u]) {
      this.nodes[u].forEach(v => {
        d[u] = k;
        let alt = d[u] + this.edgeCost[u][v];

        if( alt < d[v]) {
            d[v] = alt;
            prev[v] = u;
            Q.push(v, alt);
        }

      });
    }
  //console.log(dist);
    }
    return(d[end]);
}

module.exports = Graph;