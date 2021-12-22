const fs = require("fs");
const buffer = fs.readFileSync("input.txt");
//const buffer = fs.readFileSync("input.txt");
const fileContent = buffer.toString();

const lines = fileContent.split(/\n/);

function Cuboid(x0, x1, y0, y1, z0, z1, parity) {
    this.x0 = x0;
    this.x1 = x1;
    this.y0 = y0;
    this.y1 = y1;
    this.z0 = z0;
    this.z1 = z1;
    this.parity = parity;
}

Cuboid.prototype.volume = function () {
    return (this.x1 - this.x0 + 1) *
        (this.y1 - this.y0 + 1) *
        (this.z1 - this.z0 + 1);
}

Cuboid.prototype.intersect = function (c, parity) {
    let x0 = Math.max(this.x0, c.x0);
    let x1 = Math.min(this.x1, c.x1);
    if (x0 > x1) return null;

    let y0 = Math.max(this.y0, c.y0);
    let y1 = Math.min(this.y1, c.y1);
    if (y0 > y1) return null;

    let z0 = Math.max(this.z0, c.z0);
    let z1 = Math.min(this.z1, c.z1);
    if (z0 > z1) return null;

    return new Cuboid(x0, x1, y0, y1, z0,
        z1, parity);
}

let regions = [];
lines.forEach(l => {
    const m = l.match(/(on|off) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/);
    const c = new Cuboid(
        parseInt(m[2], 10),
        parseInt(m[3], 10),
        parseInt(m[4], 10),
        parseInt(m[5], 10),
        parseInt(m[6], 10),
        parseInt(m[7], 10),
        m[1] === 'on' ? 1 : -1);

    regions.push(c);
});


let fullstack = [];

let c;
while (c = regions.shift()) {
    let newCubiods = [];

    // Undo any interference to off
    fullstack.forEach(f => {
        const int = c.intersect(f);
        if (int) {
            int.parity = -f.parity;
            newCubiods.push(int);
        }
    });
    // Turn on if needed
    if (c.parity === 1) {
        newCubiods.push(c);
    }
    fullstack.push(...newCubiods)
}

let onCount = 0;
fullstack.forEach(f => {
    const v = f.volume();
    onCount += v * f.parity;
})

console.log(onCount);