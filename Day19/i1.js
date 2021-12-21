const fs = require("fs");
const Matrix = require("../common/matrix");
const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();

const lines = fileContent.split(/\n/);

// https://www.euclideanspace.com/maths/algebra/matrix/transforms/examples/index.htm
const permsStrings = [
`
1	0	0
0	1	0
0	0	1
`,
`
1	0	0
0	0	-1
0	1	0
`,
`1	0	0
0	-1	0
0	0	-1`,
`1	0	0
0	0	1
0	-1	0
 `,
 `0	-1	0
 1	0	0
 0	0	1`,

 `0	0	1
 1	0	0
 0	1	0`,
 `
 0	1	0
1	0	0
0	0	-1`,
`
0	0	-1
1	0	0
0	-1	0`,
`-1	0	0
0	-1	0
0	0	1`,
`-1	0	0
0	0	-1
0	-1	0`
,
`-1	0	0
0	1	0
0	0	-1`,
`-1	0	0
0	0	1
0	1	0`,
`0	1	0
-1	0	0
0	0	1`,
`0	0	1
-1	0	0
0	-1	0`,
`0	-1	0
-1	0	0
0	0	-1`,
`0	0	-1
-1	0	0
0	1	0`,
`0	0	-1
0	1	0
1	0	0`,
`0	1	0
0	0	1
1	0	0`,
`0	0	1
0	-1	0
1	0	0`,
`0	-1	0
0	0	-1
1	0	0`,
`0	0	-1
0	-1	0
-1	0	0`,
`0	-1	0
0	0	1
-1	0	0`,
`0	0	1
0	1	0
-1	0	0
 `,
 `0	1	0
 0	0	-1
 -1	0	0`
];

const perms = permsStrings.map(p => 
    new Matrix(p))

let k = -1;
let scannersMap = {};
while(lines.length) {
    const l = lines.shift();
    if(!l.length) {

    } else if(/scanner/.test(l)) {
        k++;
        scannersMap[k] = [];
    } else {
        const v = l.split(',').map(n => parseInt(n,10));
        scannersMap[k].push(v);
    }
}

const scanners = new Array(k+1);
for(let i = 0; i < scanners.length; i++) {
    scanners[i] = scannersMap[i];
}

function countOverlap(source, dest, delta) {
   // console.log(source, s0, dest, dest0);
   const sp = source;
   const dp = dest.map(
       d => [d[0] + delta[0], d[1] + delta[1], d[2] + delta[2]]
       );

   let m = {};
   let count = 0;
   sp.forEach(v => {
      // console.log(JSON.stringify(v));
    m[JSON.stringify(v)] = 1;
   });

   dp.forEach(v => {
    if(m[JSON.stringify(v)]) count++;
   });

   return count;
}

let scanMap = {};

function checkPairTransform(si, sj, perm) {

    const source = scanners[si];
    const dest = scanners[sj].map(v => perm.transform(v));
    for(let i = 0; i< source.length; i ++) {
        for(let j = 0; j < dest.length; j++) {
            const delta = [
                -(dest[j][0] - source[i][0]),
                -(dest[j][1] - source[i][1]),
                -(dest[j][2] - source[i][2]),
            ];
            const overlap = countOverlap(source, dest, delta);
            if(overlap >= 12) {
                if(!scanMap[si]) {
                    scanMap[si] = {};
                }
                scanMap[si][sj] = {
                    overlap: overlap,
                    perm: perm,
                    delta: delta
                }
                return;//
               // console.log(overlap, i, j, perm);
            }
        }
    }
}

function checkPair(i, j) {
    for(let k = 0; k < perms.length; k++)
        checkPairTransform(i, j, perms[k]);
}

for(let i = 0; i < scanners.length; i++) {
    for(let j = 0; j < scanners.length; j++) {
        if( i !== j) checkPair(i, j);
    }
}

console.log(scanMap);

let visited = {};
let becons = {};

function visit(v, m, delta) {
    if(visited[v]) return;
    visited[v] =1;
    console.log(v);

    console.log(delta);
    scanners[v].forEach(b => {
        const t = m.transform(b);
        const td = [
            t[0] + delta[0],
            t[1] + delta[1],
            t[2] + delta[2],
        ]
        becons[JSON.stringify(td)] = 1;
    });

    for(let k in scanMap[v]) {
        const ent = scanMap[v][k];
        const mk = m.mult(ent.perm);
        const dk = m.transform(ent.delta);
        visit(k, mk, [
            dk[0] + delta[0],
            dk[1] + delta[1],
            dk[2] + delta[2],
        ]);
    }

    
}

visit(0, perms[0], [0,0,0]);

console.log(Object.keys(becons).length);
//console.log(becons);
