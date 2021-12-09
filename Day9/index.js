const fs = require("fs");
const Matrix = require('../common/matrix');

const buffer = fs.readFileSync("input2.txt");
const fileContent = buffer.toString();

const lines = fileContent.split(/\n/);

const m = lines.length;
const n = lines[0].length;

const dep = new Matrix(m,n);

lines.forEach((l,i) => {
    l.trim().split('').forEach((d,j) => {
        dep[i][j] = parseInt(d);
    });
});

function depth(i,j) {
    if( i < 0 || j < 0 || i >= m || j >= n) {
        return 100;
    }
    return dep[i][j];
}

let cost = 0;

for(let j=0; j < n; j++) {
    for(let i = 0; i < m; i++) {
        const d = depth(i,j);
        const low =
            d < depth(i-1,j)
            && d < depth(i+1,j)
            && d < depth(i, j-1)
            && d < depth(i, j+1);

        if(low) {
            cost += (d+1);
            console.log(`${i}, ${j}: ${d}`);
        }
        
    }
}

//dep.print();
console.log(cost);


