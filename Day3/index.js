const fs = require("fs");

const buffer = fs.readFileSync("input2.txt");
const fileContent = buffer.toString();

const lines = fileContent.split(/\n/);

let N = 1;
const d = lines.map(m => {
    if( m.length > N) {
        N = m.length;
    }
    return parseInt(m,2);
});


let counts = new Array(N).fill(0);



d.forEach(v => {
    let t = 1;
    for(let i=0; i<N; i++) {
        const test = v & t;
        if( test) {
            counts[i]++
        }
        t *=2;
    }

});

let gamma = 0;
let t = 1;
for(let i=0; i<N; i++) {
    const ones = counts[i];
    const zeros = d.length - ones;
    if( ones > zeros) {
        gamma |= t;
    }
    if( ones === zeros) {
        console.log('gahh!');
    }
    t *=2;
}

const comp = t - 1;
const eps = comp ^ gamma;


console.log(gamma * eps);
console.log(d);



