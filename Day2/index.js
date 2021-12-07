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



function delta(move) {
    let d = {
        x: 0,
        y: 0
    };

    switch (move.dir) {
        case 'forward':
            d.x += move.val;
            break;
        case 'down':
            d.y += move.val;
            break;
        case 'up':
            d.y -= move.val;
            break;
    }

    return d;
}

function inc(a,b) {
    a.x += b.x;
    a.y += b.y;
}


let pos = {
    x: 0,
    y: 0
}

moves.forEach(m => {
    d = delta(m);
    inc(pos, d)
});

console.log(pos.x*pos.y);