const fs = require("fs");

let p1 = {
    pos: 7 -1,
    score: 0
};

let p2 = {
    pos: 8 - 1,
    score: 0
};

let d = 0;
let rolls = 0;
function detDie() {
    const ret = d + 1;

    d = (d+1) % 100;
    rolls++;

    return ret

}

let lost;

function doMove(p) {
    const d = detDie() + detDie() + detDie();
    p.pos = (p.pos + d) % 10;
    p.score += (p.pos+1);
}

while(true) {
    doMove(p1);
    if(p1.score >= 1000) {
        lost = p2;
        break;
    }

    doMove(p2);
    if(p2.score >= 1000) {
        lost = p1;
        break;
    }
}

console.log(lost.score * rolls);

