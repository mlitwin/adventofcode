const Graph = require('../common/graph');


/*

#############
#012-34-56-78-910#
###11#13#15#17###
  #19#20#21#22
  #23#24#25#26
  #12#14#16#18#
  #########

*/

const roomMoves = [
    [1], // 0
    [0,2], // 1
    [1, 3, 11], // 2
    [2,4], // 3
    [3,5,13], // 4
    [4,6], // 5
    [5,7,15], // 6
    [6,8], // 7
    [7,9,17], // 8
    [8,10], // 9
    [9], // 10
    [2,19], // 11
    [23], // 12
    [4,20], // 13
    [24], // 14
    [6,21], // 15
    [25], // 16
    [8,22], // 17
    [26], // 18
    [11,23], // 19,
    [13,24], // 20,
    [15,25], // 21,
    [17,26], // 22,
    [19,12], // 23,
    [20,14], // 24,
    [21,16], // 25,
    [22,18], // 26,
];

const roomCells = {
    'A': [11, 19, 23, 12], // 2
    'B': [13, 20, 24, 14], // 4
    'C': [15, 21, 25, 16], // 6
    'D': [17, 22, 26, 18], // 8
};

const scoring = {
    'A': 1,
    'B': 10,
    'C': 100,
    'D': 1000
};


const numCells = 27;

function State(init) {
    this.v = init;
    this.s = new Array(numCells).fill('.');
    init.forEach(a => {
        this.s[a.v] = a.t;
    });
}

State.prototype.key = function() {
    return this.s.join('');
}

State.prototype.visit = function(start, m, steps, callback) {
    callback(start, steps);
    m[start] = 1; steps++;
    roomMoves[start].forEach(r => {
        if( m[r] || this.s[r] !== '.') return;
        this.visit(r, m, steps, callback);
    });

    m[start] = 0; steps--;
}

State.prototype.destRoom = function(a) {
    const aV = a.v;
   // if( a.v > 10) return null;
    const cells = roomCells[a.t];

    for(let i = 0; i < cells.length; i++) {
        const cellVal = this.s[cells[i]];
        if(cellVal !== '.' && cellVal != a.t) {
            return null;
        }
    }

    for(let i = cells.length - 1; i >=0; i--) {
        const cellVal = this.s[cells[i]];
        if(cellVal === '.') {
            return cells[i];
        }
    }
    /*
    const outer =  this.s[cells[0]];
    const inner =  this.s[cells[1]];
    if(cells[0] === a.v || cells[1] === a.v) return null;
    if( outer === '.' && inner === '.') return cells[1];
    if( outer === '.' && inner === a.t && cells[0] !== a.v) return cells[0];
    */

    //return cells[lastCellIndex];
};

State.prototype.allHome = function(a) {
    const cells = roomCells[a.t];
    const outer =  this.s[cells[0]];
    const inner =  this.s[cells[1]];
    return(inner === a.t && outer == a.t);
}

function clone(a) {
    return JSON.parse(JSON.stringify(a));
}

State.prototype.oneMover = function(a, moves) {
   // if(this.allHome(a)) return;

    const dest = this.destRoom(a);

    if(a.v <= 10 && dest === null) return;
    if(a.v > 10 && dest === undefined) return;



    function roomStop(r) {
        if(a.v <= 10) return r === dest;

        if(r === 2 || r === 4 || r === 6 | r === 8) return false;

        return r <= 10 || r === dest;
    }



   // console.log(dest);
    this.visit(a.v, {}, 0, (d, dist) => {
        if(roomStop(d)) {
            let vNew = clone(this.v);
            let aNew = vNew.find(an => (an.t === a.t && an.v === a.v));
            aNew.v = d;
            moves.push({
                v:vNew,
                score: dist * scoring[a.t]
            });
        }
    });
}

State.prototype.moves = function(stack, visitedStates) {

   const sourceKey = this.key();
   visitedStates[sourceKey] = 1;
   //console.log(`setting ${sourceKey}`);

   let moves = [];
    this.v.forEach(a => {
        this.oneMover(a, moves);
    });

    //console.log(moves);

    moves.forEach(m => {
        const dest = new State(clone(m.v));
        const destKey = dest.key();
        const cost = m.score;
        g.addDirectedEdge(sourceKey, destKey, cost);
        if(!visitedStates[destKey]) {
           // console.log(`pushing ${destKey}`);
            visitedStates[destKey] = 1;
            stack.push(dest);
        }
    });
 

   // console.log(this.s.join(''));
}

/* Sample
#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########
*/

/*

  #D#C#B#A#
  #D#B#A#C#

  #19#20#21#22
  #23#24#25#26
*/

let start = new State(
    [{t: 'A', v: 12},
    {t: 'A', v: 18},
    {t: 'B', v: 11},
    {t: 'B', v: 15},
    {t: 'C', v: 13},
    {t: 'C', v: 16},
    {t: 'D', v: 14},
    {t: 'D', v: 17},


    {t: 'A', v: 22},
    {t: 'A', v: 25},
    {t: 'B', v: 21},
    {t: 'B', v: 24},
    {t: 'C', v: 20},
    {t: 'C', v: 26},
    {t: 'D', v: 19},
    {t: 'D', v: 23},

]
);


/*
#...........#
###C#C#B#D###
  #D#A#B#A#
  #########
*/


start = new State(
    [{t: 'A', v: 14},
    {t: 'A', v: 18},
    {t: 'B', v: 15},
    {t: 'B', v: 16},
    {t: 'C', v: 11},
    {t: 'C', v: 13},
    {t: 'D', v: 12},
    {t: 'D', v: 17},


    {t: 'A', v: 22},
    {t: 'A', v: 25},
    {t: 'B', v: 21},
    {t: 'B', v: 24},
    {t: 'C', v: 20},
    {t: 'C', v: 26},
    {t: 'D', v: 19},
    {t: 'D', v: 23},


]
);



let end = new State(
    [{t: 'A', v: 11},
    {t: 'A', v: 12},
    {t: 'B', v: 13},
    {t: 'B', v: 14},
    {t: 'C', v: 15},
    {t: 'C', v: 16},
    {t: 'D', v: 17},
    {t: 'D', v: 18},

    {t: 'A', v: 19},
    {t: 'A', v: 23},
    {t: 'B', v: 20},
    {t: 'B', v: 24},
    {t: 'C', v: 21},
    {t: 'C', v: 25},
    {t: 'D', v: 22},
    {t: 'D', v: 26},

]
);

let nodeStack = [start];
let visitedStates = {};
let g = new Graph();

while(nodeStack.length) {
    console.log(nodeStack.length)

    const a = nodeStack.shift();
    a.moves(nodeStack, visitedStates);
}



const d = g.leastCostPath3(start.key(), end.key());

console.log(d);

// not 15273 too low
// 15429 too high

