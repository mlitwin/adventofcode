const fs = require("fs");
const buffer = fs.readFileSync("input2.txt");
const fileContent = buffer.toString();

let crabs = fileContent.split(',').map(v => parseInt(v));

crabs = crabs.sort((a,b) => a - b);

const sum = crabs.reduce((p,n) => p + n);

function fuleAt(k) {
    let s = 0;
    for(let i =0; i < crabs.length; i++) {
        s += Math.abs(crabs[i] - k)
    }
    return s;
}

let k = 0;
let minFule;
while(k < crabs.length) {
    const fule = fuleAt(crabs[k])
    if(minFule === undefined || minFule > fule) {
        minFule = fule;
    }
   // console.log(`${crabs[k]}: ${fule}`); 
    k++;
}

console.log(minFule);
