const fs = require("fs");
const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();

const lines = fileContent.split(/\n/);


function parseSN(input) {
    const c = input.shift();
    if( /^\d$/.test(c)) {
        const v = parseInt(c, 10);
        return {
            t: 'normal',
            v: v
        };
    }
    const l = parseSN(input);
    const comma = input.shift();
    const r = parseSN(input);
    const rbracked = input.shift();

    return {
        t: 'pair',

        l: l,
        r: r
    }
}

function printSN(sn) {
    if(sn.t === "normal") {
        process.stdout.write(`${sn.v}`);
        return;
    }
    process.stdout.write('[');
    printSN(sn.l);
    process.stdout.write(',');
    printSN(sn.r);
    process.stdout.write(']');
}


function normalList(start, stack) {
    if(start.t === 'normal') {
        stack.push(start);
    } else {
        normalList(start.l, stack);
        normalList(start.r, stack);
    }
}

function left4(sn, depth) {
    if(sn.t === "normal") return null;
    if(depth === 4) return sn;
    const l = left4(sn.l, depth+1);

    if(l) return l;
    const r = left4(sn.r, depth+1);
    return r;
}

function reduce(sn) {

    let cont = true;

    while(cont) {

       // printSN(sn); console.log('');
        let normals = [];
        normalList(sn, normals);
        const l4 = left4(sn, 0);

       // console.log(l4);

        cont = false;

        if( l4) {
          //  printSN(sn); console.log('');
          //  printSN(l4); console.log('');

            let index = normals.findIndex(s => s === l4.l);
            //console.log(index);
            const leftVal = l4.l.v;
            const rightVal = l4.r.v;
            if( index > 0) {
                normals[index -1].v += leftVal;
            }
            index += 2;
            if( index <= normals.length - 1) {
                normals[index].v += rightVal;
            }
            l4.t = 'normal';
            l4.v = 0;
            delete l4.l;
            delete l4.r;

            cont = true

        } else {
            const ten = normals.find(s => s.v >= 10);
          //  console.log(ten);
            if( ten) {
              //  printSN(ten); console.log('');
                const val = ten.v;
                ten.t = 'pair';
                ten.l = { t: 'normal', v: Math.floor(val/2)};
                ten.r = { t: 'normal', v: Math.ceil(val/2)};
                delete ten.v;

                cont = true;

            }
        }
       // printSN(sn);

    }

    return sn;
}


let sns = []

lines.forEach(l => {
    const s = parseSN(l.split(''));
    printSN(s); console.log('');
    sns.push(s);
});

function magnitude(sn) {
    if(sn.t === 'normal') {
        return sn.v;
    } else {
        return 3 * magnitude(sn.l) + 2 * magnitude(sn.r);
    }
}

let maxMax = -1;

function clone(sn) {
    return JSON.parse(JSON.stringify(sn));
}

for(let i = 0; i < sns.length; i++) {
    for(let j = 0; j < sns.length; j++) {
        if( i !== j) {
            const sum = {
                t: 'pair',
                l: clone(sns[i]),
                r: clone(sns[j])
            };
            const r = reduce(sum)
            const m = magnitude(r);
            console.log(`${i}, ${j} -> ${m}`);
            printSN( sns[i]); console.log('');
            printSN( sns[j]); console.log('');

            printSN(r); console.log('');

            if( m > maxMax) maxMax = m;
        }
    }
}

//const mag = magnitude(sum);
console.log(maxMax);
//



