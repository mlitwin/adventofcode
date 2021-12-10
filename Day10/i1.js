const fs = require("fs");
const buffer = fs.readFileSync("input2.txt");
const fileContent = buffer.toString();

const lines = fileContent.split(/\n/);

function code(v) {
    switch(v) {
        case '(':
            return -1;
        case ')':
            return 1;
        case '[':
            return -2;
        case ']':
            return 2;
        case '{':
            return -3;
        case '}':
            return 3;
        case '<':
            return -4;
        case '>':
            return 4;
    } 
}

/*
): 3 points.
]: 57 points.
}: 1197 points.
>: 25137 point
*/

function codeScore(c) {
    switch(c) {
        case 1:
            return 3;
        case 2:
            return 57;
        case 3:
            return 1197;
        case 4:
            return 25137;

    } 
}

function popVal(stack, val) {
    if(!stack.length) {
        return false;
    }
    const v = stack.pop();
    if( v === val) return true;

    return false;
}

function scoreLine(l) {
    let stack = [];
    for(let i = 0; i < l.length; i++) {
        const c = code(l[i]);
        if( c < 0) {
            stack.push(c);
        } else {
            if(!popVal(stack, -c)) {
                //console.log(l[i]);
                return codeScore(c);
            }
        }
  
        //console.log(c);
    }
    return 0;
}

let s = 0;
lines.forEach(l => {    
    s+= scoreLine(l);
});
console.log(s);
