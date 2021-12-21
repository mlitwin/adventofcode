const Matrix = require("../common/matrix");

let p1 = new Matrix(21,10);
p1[0][7-1] = 1;

let p2 = new Matrix(21,10);
p2[0][8 -1] = 1;

const rolls = [
    {d: 3, n: 1},
    {d: 4, n: 3},
    {d: 5, n: 6},
    {d: 6, n: 7},
    {d: 7, n: 6},
    {d: 8, n: 3},
    {d: 9, n: 1}
]


function doRoll(p) {
    let np = new Matrix(21,10);
    let wins = 0;

    p.eachElement((v, score, pos) => {
        rolls.forEach(r => {
            const npos = (pos + r.d) % 10;
            const nscore = score + npos + 1;
            const numNew = r.n * v;
            if( nscore >= 21) {
                wins += numNew;
            } else {
                np[nscore][npos] += numNew
            }
        })
    });


    np.eachElement((v, i, j) => {
      p[i][j] = v;
    });


    return wins;
}

function doMove(p) {
    const d = detDie() + detDie() + detDie();
    p.pos = (p.pos + d) % 10;
    p.score += (p.pos+1);
}

function worlds(p) {
    let worlds = 0;

    p.eachElement(v => {
        worlds += v;
    });

    return worlds;
}

let p1Total = 0;
let p2Total = 0;

while(true) {
    p1.print();
    const p1wins = doRoll(p1);
    const p2worlds = worlds(p2)
    if(p2worlds === 0) break;
    p1Total += p1wins * p2worlds;

    const p2wins = doRoll(p2);
    const p1worlds = worlds(p1);
    if(p1worlds === 0) break;
    p2Total += p2wins * p1worlds;
}

console.log(p1Total);
console.log(p2Total);

