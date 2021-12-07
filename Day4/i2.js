const fs = require("fs");
const {
    exit
} = require("process");

const buffer = fs.readFileSync("input2.txt");
const fileContent = buffer.toString();

const lines = fileContent.split(/\n/);

const picks = lines.shift().split(',').map(v => parseInt(v));

//console.log(picks);

function Board(squares) {
    const N = squares[0].length;
    this.N = N;
    this.squares = squares;

    this.rowCount = new Array(N).fill(0);
    this.colCount = new Array(N).fill(0);
    this.lookup = {};
    squares.forEach((row, j) => {
        row.forEach((v, i) => {
            //console.log(`(${i}, ${j} -> ${v}`);
            this.lookup[v] = {
                i: i,
                j: j
            }
        })
    })
    // this.print();
}

Board.prototype.print = function () {
    console.log(this.squares);
}

Board.prototype.pick = function (v) {
    const l = this.lookup[v];
    let bingo = false;
    if (l) {
        this.rowCount[l.i]++;
        this.colCount[l.j]++;
        bingo = bingo || (this.rowCount[l.i] >= this.N) || (this.colCount[l.j] >= this.N)
    }

    return bingo;
}

Board.prototype.unpickedSum = function (picked) {
    let sum = 0
    this.squares.forEach((row, j) => {
        row.forEach((v, i) => {
            if( !picked[v]) {
                sum += v;
            }
        })
    });
    return sum;
}


let boardInput = [];
let boards = [];

while (lines.length) {
    const line = lines.shift();
    // console.log(line);
    if (line.length === 0) {
        if (boardInput.length) {
            boards.push(new Board(boardInput));
        }
        boardInput = []
    } else {
        boardInput.push(line.trim().split(/\s+/).map(v => {
            return parseInt(v);
        }))
    }
}
if (boardInput.length) {
    boards.push(new Board(boardInput));
}


let picked = {};
let bingoed = {};

while (picks.length) {
    const p = picks.shift();
    picked[p] = true;
    //e.log(p);
    boards.forEach((b, index) => {
        if (!bingoed[index] && b.pick(p)) {
            bingoed[index] = true;
            const unpickedSum = b.unpickedSum(picked);
            console.log(unpickedSum * p);

           // exit(0);
        }
    })
}