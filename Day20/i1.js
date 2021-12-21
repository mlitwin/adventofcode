const fs = require("fs");
const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();

let lines = fileContent.split(/\n/);

const codes = lines.shift().split('');
lines.shift();

function Grid() {
    this.x0 = Infinity;
    this.y0 = Infinity;
    this.x1 = -Infinity;
    this.y1 = -Infinity;
    this.default = '.';
    this.v = {};
}

Grid.prototype.set = function (i, j, v) {
    if (!this.v[i]) this.v[i] = {};
    this.v[i][j] = v;

    this.x0 = Math.min(this.x0, i);
    this.x1 = Math.max(this.x1, i);
    this.y0 = Math.min(this.y0, j);
    this.y1 = Math.max(this.y1, j);
}

Grid.prototype.get = function (i, j) {
    const v = this.v;
    if (!v[i]) return this.default;

    const w = v[i];
    if (!(j in w)) return this.default;


    return w[j];
}

Grid.prototype.getCode = function (i0, j0) {
    let val = '';
    for (let j = j0 - 1; j <= j0 + 1; j++) {
        for (let i = i0 - 1; i <= i0+ 1; i++) {
            const c = this.get(i, j);
            val += (c === '#') ? '1' : '0';
        }
    }
    return parseInt(val, 2);
}

Grid.prototype.count = function(v) {
    if(v === this.default) return Infinity;
    let count = 0;
    for(let i in this.v) {
        for(let j in this.v[i]) {
            const c = this.v[i][j];
            if(c === v) count++;
        }
    }
    return count;
}

let g = new Grid();
for (let j = 0; j < lines.length; j++) {
    const l = lines[j];
    for (let i = 0; i < l.length; i++) {
        g.set(i, j, l[i]);
    }
}

for (let n = 0; n < 2; n++) {
    let ng = new Grid();
    for (let i = g.x0 - 1; i <= g.x1 + 1; i++) {
        for (let j = g.y0 - 1; j <= g.y1 + 1; j++) {
            const code = g.getCode(i, j);
            const v = codes[code];
            ng.set(i, j, v);
        }
    }
    ng.default = (g.default === '.') ? codes[0] : codes[codes.length - 1];
    g = ng;
}


console.log(g.count('#'));