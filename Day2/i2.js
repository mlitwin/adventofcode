const fs = require("fs");

const buffer = fs.readFileSync("input2.txt");
const fileContent = buffer.toString();

const lines = fileContent.split(/\n/);


const moves = lines.map(m => {
    const s = m.split(' ');
    return {
        dir: s[0],
        val: parseInt(s[1], 10)
    };
});



function delta(pos, move) {
    let d = {
        x: 0,
        y: 0,
        aim: 0
    };

    switch (move.dir) {
        case 'forward':
            d.x += move.val;
            d.y += pos.aim * move.val;
            break;
        case 'down':
            d.aim += move.val;
            break;
        case 'up':
            d.aim -= move.val;
            break;
    }

    return d;
}

function inc(a,b) {
    a.x += b.x;
    a.y += b.y;
    a.aim += b.aim;
}


let pos = {
    x: 0,
    y: 0,
    aim: 0
}

moves.forEach(m => {
    d = delta(pos, m);
    console.log(d);
    inc(pos, d);
});

console.log(pos.x*pos.y);