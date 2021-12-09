const fs = require("fs");
const buffer = fs.readFileSync("input2.txt");
const fileContent = buffer.toString();

let crabs = fileContent.split(',').map(v => parseInt(v));

crabs = crabs.sort((a,b) => a - b);

const sum = crabs.reduce((p,n) => p + n);

function fuleAt(k) {
    let s = 0;
    for(let i =0; i < crabs.length; i++) {
        const d =  Math.abs(crabs[i] - k);
        s += d * (d+1)/2;
    }
    return s;
}

let k = crabs[0];
const endCrab = crabs[crabs.length - 1];
let minFule;
while(k <= endCrab) {
    const fule = fuleAt(k)
    if(minFule === undefined || minFule > fule) {
        minFule = fule;
    }
   // console.log(`${crabs[k]}: ${fule}`); 
    k++;
}

console.log(minFule);
