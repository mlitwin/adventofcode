const fs = require("fs");
const Matrix = require('../common/matrix');

const buffer = fs.readFileSync("input2.txt");
const fileContent = buffer.toString();

const fish = fileContent.split(',').map(v => parseInt(v,10));

let v = new Array(9).fill(0);

fish.forEach(f => {
    v[f]++;
});

/*
0 1 0 0 0 0 0 0 0
0 0 1 0 0 0 0 0 0
0 0 0 1 0 0 0 0 0
0 0 0 0 1 0 0 0 0
0 0 0 0 0 1 0 0 0
0 0 0 0 0 0 1 0 0
1 0 0 0 0 0 0 1 0
0 0 0 0 0 0 0 0 1
1 0 0 0 0 0 0 0 0
*/


let gen = new Matrix(9,9);
for(let i = 0; i < 8; i++) {
    gen[i][i+1]=1;
}
gen[8][0]=1;
gen[6][0]=1;


let N = 256;

for(let k = 0; k < N; k++) {
  v = gen.transform(v);
}

const sum = v.reduce((a,b)=> a+b);
console.log(sum);
