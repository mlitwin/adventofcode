const fs = require("fs");
const Matrix = require('../common/matrix');
const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();

const xRange = fileContent.match(/x=(\d+)\.\.(\d+|)/);
const yRange = fileContent.match(/y=-(\d+)\.\.-(\d+)/);

const x0 = parseInt(xRange[1]);
const x1 = parseInt(xRange[2]);

const y0 = -parseInt(yRange[1]);
const y1 = -parseInt(yRange[2]);

console.log(`${x0},${y0} -> ${x1},${y1}`);



let yhits = {};

function maxY(vy, n) {
    let m = 0;
    let y = 0;
    for(let i = 0; i < n; i++) {
        y += vy;
        vy -= 1;
        if( y > m) {
            m = y;
        }
    }

    return m;
}

let maxN = 1;


for(let y = y0; y <= y1; y++) {
    for(let n = 1; n <= -2* y; n++) {
        const vy = y / n + (n-1)/2;
        if(vy === Math.floor(vy)) {
            if(!yhits[n]) {
                yhits[n] = [];
            }
            yhits[n].push(vy);
            console.log(`${n} v ${vy} hits ${y} `)
            maxN = Math.max(maxN, n);
           // console.log(`${vy} ${maxY(vy,n)}`);
        }
    }
}

/*
for(let x = x0; x<= x1; x++) {
    for(let n = 1; n <= 2* x; n++) { // ???limit
        const vx = x / n - (n-1) / 2;
        if(vx === Math.floor(vx)) {
            console.log(`${vx} at ${n}`);
        }

    }
}*/

let maxH = 0;
let hitCounter = {};

function doHit(n, vx) {
    const vys = yhits[n];
    if(!vys) return;
   // console.log(vx);
    //console.log(vys);
    const vy = vys[vys.length -1];
    const m = maxY(vy,n);
    //console.log(`${n}: ${vx}, ${vy} -> ${m}`);
    vys.forEach(v => {
        hitCounter[`${vx}, ${v}`] = 1;
    })
    
    if( m > maxH) maxH = m; 
}

function yHitAtOrMore(n, vx) {
    for(let k in yhits) {
        if(k >= n) {
            doHit(k, vx);
           // console.log(`at ${n}`);
        }
    }
}

function fireX(vx) {
    let x = 0;
    let n = 1;
    const vx0 = vx;
  //  console.log(vx0);
    while(n <= maxN) {
        x+=vx;
        vx -= Math.sign(vx);

        if( x > x1) break;
        if( x >= x0) {
            if(vx !== 0) {
                if( yhits[n]) {
                    doHit(n, vx0);
                   // console.log(`${x} at ${n}`);
                }
            } else {
                yHitAtOrMore(n, vx0)
            }

        }

        n++;
    }
}

for(let vx = 1; vx <= x1; vx++) {
    fireX(vx);
}

console.log(Object.keys(hitCounter).length);
//console.log(yhits);

