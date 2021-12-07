const fs = require("fs");

const buffer = fs.readFileSync("input2.txt");
const fileContent = buffer.toString();

const lines = fileContent.split(/\n/);

let N = 1;
const d = lines.map(m => {
    if (m.length > N) {
        N = m.length;
    }
    return parseInt(m, 2);
});

function reduceListOx(l, n, ox) {
    let zeros = 0;
    let ones = 0;
    let test = 1 << n;
    l.forEach(v => {
        if (!!(v & test)) {
            ones++
        } else {
            zeros++;
        }
    });


    return l.filter(v => {
        const t = !!(v & test);
        if (ox) {
            let keep;

            if( t) {
                keep = ones >= zeros;
            } else {
                keep = zeros > ones;
            }
            return keep;
        } else {
            if( t) {
                keep = ones < zeros;
            } else {
                keep = zeros <= ones;
            }

        }
        return keep;


    });
}

let l = d;
let testN = 0;


while (l.length > 1) {
    l = reduceListOx(l,  N - testN -1 , true);
    testN++;
}
const ox = l[0];

l = d;
testN = 0;

while (l.length > 1) {

    l = reduceListOx(l, N - testN -1 , false);
    testN++;
}

const co2 = l[0];


console.log(ox*co2);
