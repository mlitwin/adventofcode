const fs = require("fs");
const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();

const lines = fileContent.split(/\n/);

/*
1, 4, 7, and 8

0: 7
1: 2
2: 5
3: 5
4: 4
5: 5
6: 6
7: 3
8: 7
9: 6

*/

function Seven(text) {
    this.inputs = text; 
}

Seven.prototype.sigCount = function() {
    return this.inputs.length;
}

let count = 0;
lines.forEach(l => {
    const m = l.trim().split('|');
    const patterns = m[0].trim().split(' ');
    const digits = m[1].trim().split(' ');
   // console.log(digits);

    digits.forEach(d => {
        const sig = new Seven(d);
        const c = sig.sigCount();
        //console.log(d);
        if( c === 2 || c === 4 || c === 3 || c === 7) {
            console.log(d);
            count++;
        }

    });
});
console.log(count);
