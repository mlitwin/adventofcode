const fs = require("fs");
const {
    exit
} = require("process");

const buffer = fs.readFileSync("input2.txt");
const fileContent = buffer.toString();
const fileLines = fileContent.split(/\n/);

//console.log(picks);

function Line(x0,y0,x1,y1) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;

    this.dx = Math.sign(x1 - x0);
    this.dy = Math.sign(y1 - y0);
}

Line.prototype.print = function () {
    console.log(this);
}

Line.prototype.walk = function (callback) {
    let x = this.x0;
    let y = this.y0;

    while(!(x === this.x1 && y === this.y1)) {
        callback(x,y);
        x += this.dx;
        y += this.dy;
    }

    callback(x,y);
}

const lines = fileLines.map(l => {
    const pairs = l.split('->').map( v => v.trim());
    const p0 = pairs[0].split(',').map(v => parseInt(v,10));
    const p1 = pairs[1].split(',').map(v => parseInt(v,10));
    const line = new Line(p0[0], p0[1], p1[0], p1[1]);
   // line.print();
    return line;
});

function Grid() {
    this.m = {};
}

Grid.prototype.visit = function(x,y) {
    const key = `${x},${y}`;
    if( !this.m[key]) this.m[key] = 0;
    this.m[key]++;
    return this.m[key];
}

let count = 0;
let g = new Grid;
function visitGrid(x,y) {
    const c = g.visit(x,y);
    console.log(`${x},${y} -> ${c}`);
    if(c === 2) count++;
}

lines.forEach(l => {
  //  if(l.dx * l.dy !== 0) return;
    l.walk(visitGrid);
});

console.log(count);

