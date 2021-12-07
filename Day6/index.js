const fs = require("fs");
const Matrix2 = require('../common/matrix');

const buffer = fs.readFileSync("input2.txt");
const fileContent = buffer.toString();

const fish = fileContent.split(',').map(v => parseInt(v,10));

let v = new Array(9).fill(0);

fish.forEach(f => {
    v[f]++;
});

function Matrix(n, m) {
  this.n = n;
  this.m = m;
  this.v = [];
  for(let i = 0; i < n; i++) {
      this.v.push(new Array(m).fill(0));
  }   
}

Matrix.prototype.mVec = function(v) {
    let i,j;
    let ret = new Array(v.length).fill(0);
    for(j = 0; j < v.length; j++) {
        for(i =0; i < this.m; i++) {
            ret[j] += this.v[j][i] * v[i];
        }
    }
    return ret;
}

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
    gen.v[i][i+1]=1;
}
gen.v[8][0]=1;
gen.v[6][0]=1;


let N = 256;

for(let k = 0; k < N; k++) {
  v = gen.mVec(v);
}

const sum = v.reduce((a,b)=> a+b);
console.log(sum);
