const fs = require("fs");
const {
    exit
} = require("process");
const buffer = fs.readFileSync("input2.txt");
const fileContent = buffer.toString();

const lines = fileContent.split(/\n/);

/*
1, 4, 7, and 8

0: 6 - abcefg
1: 2 - cf
2: 5 - acdeg
3: 5 - acdfg
4: 4 - bcdf
5: 5 - abdfg
6: 6 - abdefg
7: 3 - acf
8: 7 - abcdefg
9: 6 - abcdfg

1 cycle
1: 2 - cf
4: 4 - bcdf
7: 3 - acf
8: 7 - abcdefg

3 cycle
2: 5 - acdeg  sect(1) = c
3: 5 - acdfg [7 < 3] first sect 7 = acf
5: 5 - abdfg sect1 = f, sect(4)=bf .sect(3) = f


3 cycle
2: 5 - acdeg  sect(4) = cd
3: 5 - acdfg [7 < 3] first sect 7 = acf
5: 5 - abdfg sect1 = f, sect(4)=bdf



7 subset of 3

3 cycle
0: 6 - abcefg [7 < 0]
6: 6 - abdefg
9: 6 - abcdfg [3 < 9] first

3 < 9 not  0 or 6










0: abcXefg
1: XXcXXfX *
2: aXcdeXg
3: aXcdXfg
4: XbcdXfX *
5: abXdXfg
6: abXdefg
7: aXcXXfX *
8: abcdefg *
9: abcdXfg


5: 2&3 -> ef, 

*/

function Seven(text) {
    this.inputs = text;
    let s = {}

    text.split('').forEach(c => {
        s[c] = 1;
    });
    this.s = s;
}

Seven.prototype.sigCount = function () {
    return this.inputs.length;
}

Seven.prototype.isSubset = function (s) {
    for (let k in this.s) {
        if (!s.s[k]) return false;
    }
    return true;
}

Seven.prototype.intersection = function (s) {
    let text = '';
    for (let k in this.s) {
        if (s.s[k]) {
            text += k;
        }
    }
    return new Seven(text);
}



Seven.prototype.equals = function (s) {
    if (this.sigCount() !== s.sigCount()) {
        return false;
    }
    return this.isSubset(s);
}

function getDigit(solved, d) {
    for (let i = 0; i <= 9; i++) {
        if (solved[i].equals(d)) return i;
    }
    console.log('gahhh')
}

function solvePattern(p) {
    let ret = new Array(10);
    let sevens = [];
    p.forEach(pat => {
        sevens.push(new Seven(pat));
    });

    let c5 = [];
    let c6 = [];

    sevens.forEach(s => {
        const count = s.sigCount();
        switch (count) {
            case 2:
                ret[1] = s;
                break;
            case 4:
                ret[4] = s;
                break;
            case 3:
                ret[7] = s;
                break;
            case 7:
                ret[8] = s;
                break;
            case 5:
                c5.push(s);
                break;
            case 6:
                c6.push(s);
                break;
            default:
                exit(1);
        }

    });

    /*
1: 2 - cf
7: 3 - acf
4: 4 - bcdf




2: 5 - acdeg sect(4)= cd .sect(3) = cd
3: 5 - acdfg [7 < 3] first sect 7 = acf
5: 5 - abdfg sect1 = f, sect(4)=bf .sect(3) = f

*/


    let c5p = [];
    c5.forEach(s => {
        if (ret[7].isSubset(s)) {
            ret[3] = s;
        } else {
            c5p.push(s);
        }
    });
   // console.log(c5p);

  // const c5ptest = c5p[0].intersection(ret[4]).intersection(ret[3]).sigCount();
   const c5ptest = c5p[0].intersection(ret[4]).sigCount();
   if (c5ptest === 2) {
        ret[2] = c5p[0];
        ret[5] = c5p[1];
    } else {
        ret[2] = c5p[1];
        ret[5] = c5p[0];
    }



    /*

7: 3 - acf
3: 5 - acdfg


    0: 6 - abcefg [7 < 0]
6: 6 - abdefg
9: 6 - abcdfg [3 < 9] first
*/

    let c6p = [];
    c6.forEach(s => {
        if (ret[3].isSubset(s)) {
            ret[9] = s;
        } else {
            c6p.push(s);
        }
    });


    if (ret[7].isSubset(c6p[0])) {
        ret[0] = c6p[0];
        ret[6] = c6p[1]
    } else {
        ret[0] = c6p[1];
        ret[6] = c6p[0]
    }

    return ret;
}

let count = 0;
//console.log(lines.length)
lines.forEach(l => {
    const m = l.trim().split('|');
    const p = m[0].trim().split(' ');
    const digits = m[1].trim().split(' ');
    // console.log(digits);
    const solve = solvePattern(p);
 //   console.log(solve);

    let num = '';

    digits.forEach(d => {
        const digit = new Seven(d);
        const dig = getDigit(solve, digit);
        num += dig;

    });
   // console.log(num);
    const n = parseInt(num, 10);
   // console.log(l);
    console.log(n);


    count += parseInt(num, 10);
});
console.log(count);
// 61229

// not 992165 to small
// 992165

// 998900