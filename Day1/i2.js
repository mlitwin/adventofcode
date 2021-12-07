// get filesystem module
const fs = require("fs");

// using the readFileSync() function
// and passing the path to the file
const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();

const a = fileContent.split(/\s/).map(v => parseInt(v));

const s = new Array(a.length).fill(0);


for (var i = 0; i < a.length; i++) {
    const cur = a[i];
    console.log(cur);

    for (j = i; j >= 0 && j >= i - 2; j--) {
        s[j] += cur;
    }
}

console.log(s);


let last = undefined;
let count = 0;
for (var i = 0; i < s.length; i++) {
    const cur = s[i];

    if (last !== undefined && cur > last) {
        count++;
    }

    last = cur;
}


console.log(count);