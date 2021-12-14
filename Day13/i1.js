const fs = require("fs");
const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();

const lines = fileContent.split(/\n/);


let points = [];
let folds = [];

lines.forEach((l) => {
    const m = l.match(/fold along (.)=(\d+)/)
    if( m) {
        console.log(l);
        folds.push({
            axis: m[1],
            value : parseInt(m[2], 10)
        });
    } else {
        if(l) {
            const v = l.split(',');
            points.push(v.map(n => parseInt(n,10)));
        }
    }
});

function fold(pts, dir, fold) {
    let newpts = [];
    pts.forEach(p => {
        const x = p[0];
        const y = p[1];
        if(dir === 'y') {
            if(y <= fold) {
                newpts.push(p);
            } else {
                newpts.push([x, 2 * fold - y]);
            }
        } else {
            if(x <= fold) {
                newpts.push(p);
            } else {
                newpts.push([2 * fold - x, y]);
            }
        }
    });

    return newpts;
}

folds.forEach(f => {
    duper ={};
    points = fold(points, f.axis, f.value)
        .filter((v) => {
            const k = v.join(',');
            if(!duper[k]) {
                duper[k] = 1;
                return true;
            }
            return false;
        });
    console.log(points.length)
})

//console.log(points);