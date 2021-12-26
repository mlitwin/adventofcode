const fs = require("fs");
const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();
let lines = fileContent.split(/\n/);


function isRegister(a) {
    return a === 'w' || a === 'x' || a === 'y' || a === 'z';
}

function parseInstruction(text) {
    let elements = text.split(' ');
    const op = elements.shift();
    const args = elements.map(a => {
        if(isRegister(a)) return a;
        return parseInt(a, 10);
    });

    const ret = {
        op: op,
        args: args
    };

   // console.log(ret);

    return ret;
}


function evalInstruction(inst, reg) {
    const args = inst.args.map(a =>isRegister(a)? reg[a] : a);

    //console.log(inst);
   // console.log(reg);

    switch(inst.op) {
        case 'inp':
           // reg[inst.args[0]] = inp; // pre set
            break;
        case 'add':
            reg[inst.args[0]] = args[0] + args[1]
            break;
        case 'mul':
            reg[inst.args[0]] = args[0] * args[1]
            break;  
        case 'div':
            {
                const a = args[0]; const b = args[1];
                let v;
                if( b !== 0) {
                    const fl = a / b;
                    v = fl > 0 ? Math.floor(fl) : Math.ceil(fl);
                }
                reg[inst.args[0]] = v
            }
            break;
        case 'mod':
            reg[inst.args[0]] = args[0] % args[1]; // neg?
            break;
        case 'eql':
            reg[inst.args[0]] = (args[0] === args[1]) ? 1 : 0;
            break;  
        default:
            console.log('xxx');
            break;        
    }
   // console.log(reg);

}

function clone(v) {
    return JSON.parse(JSON.stringify(v));
}

function evalMonad(m, inputReg) {
    let reg = clone(inputReg);

    m.forEach(inst => {
        evalInstruction(inst, reg);
    });


    return reg;

}

let monads = [];
let monadData = [];

function addMondad(m) {
    monads.push(m);
    monadData.push({
        shifter: m[4].args[1] === 26,
        seekZ: (monads.length === 14) ? {'0': 1} : {},
        runs: {}
    });
}

let m;
lines.forEach((v, index) => {
    const i = index % 18;
    if( i === 0){
        if( m) addMondad(m);
        m = [];
        
    }
    m.push(parseInstruction(v));

})
addMondad(m);


//90000000000000

//console.log(monadData);

const N = 26;


function seekZFrom(m, k, Z, thisData, prevData, startZ, i) {

    let reg = {
        'w': k,
        'x': 0,
        'y': 0,
        'z': startZ
    }
    let c = evalMonad(m, reg);
    const resZ = c.z;
   // console.log(`${startZ} -> ${resZ}`);
   let runs = thisData.runs;

    if(resZ === Z) {
        console.log(`${reg.z} ${resZ} ${c.w} - ${i}`);
        if(!runs[startZ]) runs[startZ] = {};
        runs[startZ][k] = resZ;
        if(prevData) {
            if( !prevData.seekZ[reg.z]) prevData.seekZ[reg.z] = [];
            prevData.seekZ[reg.z].push({c: resZ, w: c.w});
        }
    }
}


function seekZ(m, k, Z, thisData, prevData, i) {

    const leftZ = Z * N;
    const rightZ = Math.floor(Z/N);

    seekZFrom(m, k, Z, thisData, prevData, Z, i);
    seekZFrom(m, k, Z, thisData, prevData, rightZ, i);
    for(let z = 0; z < N; z++) {
        const startZ = leftZ + z;
        seekZFrom(m, k, Z, thisData, prevData, startZ, i);
    }
}


for(let i = 13; i >= 0; i--) {
    const m = monads[i];
    let mData = monadData[i];
    let mPrevData = i > 0 ? monadData[i-1] : null;

    console.log(`------- ${i} ----------`)
   // console.log(mData);
    for(let k = 1; k < 10; k++) {
        for(let z in mData.seekZ) {
            
            seekZ(m, k, parseInt(z,10), mData, mPrevData, i);
    
        }
    }
  //  console.log(mPrevData);
}

function bestMove(runsz) {
    for(let k = 9; k >=1; k--) {
        if(k in runsz) return {
            k: k,
            z: runsz[k]
        };
    }

    return null
}

let z = 0;
for(let i = 0; i < 14; i++) {
    const runs = monadData[i].runs;
    const move = bestMove(runs[z]);
    console.log(`${i}: ${z} -> ${move.z} at ${move.k}`);
    z = move.z;
}


