const fs = require("fs");
const Matrix = require('../common/matrix');


const buffer = fs.readFileSync("input2.txt");
const fileContent = buffer.toString();

const lines = fileContent.split(/\n/);

const n = lines.length;
const m = lines[0].length;

const oct = new Matrix(n, m);


lines.forEach((l, i) => {
    l.split('').map(k => parseInt(k)).forEach((v, j) => {
        oct[i][j] = v;
    });
});

const adjacents = [];
for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {

        if (!(i === 0 && j === 0)) {
            adjacents.push([i, j]);
        }
    }
}

function eachAdjacent(i, j, f) {
    adjacents.forEach(ad => {
        const i1 = i + ad[0];
        const j1 = j + ad[1];
        if (i1 >= 0 && i1 < n && j1 >= 0 && j1 < m) {
            f(i1, j1);
        }
    });
}

function flash(o) {
    let fcount = 0;
    let flashes = [];
    let fmap = {};

    function oneCellInc(a, b) {
        o[a][b] += 1;
        const k = `${a},${b}`;
        if (o[a][b] > 9 && !fmap[k]) {
            flashes.push([a, b]);
            fmap[k] = [a, b];
        }
    }

    o.eachElement((_v, i, j) => {
        oneCellInc(i, j)
    });

    while (flashes.length) {
        const f = flashes.pop();
        fcount++;
        eachAdjacent(f[0], f[1], function (i1, j1) {
            oneCellInc(i1, j1);
        });
    }

    for (let k in fmap) {
        const f = fmap[k];
        o[f[0]][f[1]] = 0;
    }

    return fcount;
}

function firstFlash(oct) {
    let step = 1

    while (1) {
        const f = flash(oct);
        if(f === n * m) {
            return step;
        }
        step++;
    }


}

const ff = firstFlash(oct);

console.log(ff);