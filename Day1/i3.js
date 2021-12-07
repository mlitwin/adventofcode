// get filesystem module
const fs = require("fs");

// using the readFileSync() function
// and passing the path to the file
const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();

const a = fileContent.split(/\s/).map(v => parseInt(v));


function val(ar, i) {
    if( i< 0 || i >= ar.length) return 0;
    return ar[i];
}

const s = new Array(a.length).fill(0);


for(var i=0; i < s.length; i++) {
    s[i] = val(s, i - 1);
    s[i] += val(a, i + 2);
    s[i] -= val(a, i - 1);
}

console.log(s);




let last = undefined;
let count = 0;
for(var i=0; i < s.length; i++) {
    const cur = s[i];

    if(last !== undefined && cur > last) {
        count++;
    }

    last = cur;
}


console.log(count);